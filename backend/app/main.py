from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as redis
import asyncio
import json
import logging
import os
import time
import random

# Konfiguracja
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))

current_candles = {} 
TIMEFRAMES = {
    "1m": 60, "5m": 300, "15m": 900, "1h": 3600, "4h": 14400, "1d": 86400
}

def get_candle_start_time(timestamp, timeframe_seconds):
    return timestamp - (timestamp % timeframe_seconds)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

async def redis_listener(pubsub):
    global current_candles
    while True:
        message = await pubsub.get_message(ignore_subscribe_messages=True)
        if message:
            try:
                tick = json.loads(message['data'])
                price = tick['price']
                timestamp = tick['timestamp']
                
                # Wysyłamy wiadomość typu 'tick' z każdą nową ceną
                tick_message = {"type": "tick", "price": price, "timestamp": timestamp}
                await manager.broadcast(json.dumps(tick_message))

                for tf_name, tf_seconds in TIMEFRAMES.items():
                    candle_start_time = get_candle_start_time(timestamp, tf_seconds)
                    
                    if current_candles.get(tf_name) and current_candles[tf_name]["time"] == candle_start_time:
                        current_candles[tf_name]["high"] = max(current_candles[tf_name]["high"], price)
                        current_candles[tf_name]["low"] = min(current_candles[tf_name]["low"], price)
                        current_candles[tf_name]["close"] = price
                    else:
                        current_candles[tf_name] = {
                            "time": candle_start_time, "open": price, "high": price, "low": price, "close": price
                        }
                    
                    # Wysyłamy wiadomość typu 'candle' tylko dla zaktualizowanej świecy
                    candle_message = {"type": "candle", "timeframe": tf_name, **current_candles[tf_name]}
                    await manager.broadcast(json.dumps(candle_message))

            except (json.JSONDecodeError, KeyError) as e:
                logging.error(f"Could not parse message from Redis: {message['data']}, error: {e}")

@app.on_event("startup")
async def startup_event():
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
    pubsub = r.pubsub()
    await pubsub.subscribe("market_data")
    asyncio.create_task(redis_listener(pubsub))
    logging.info("Redis listener with tick & candle broadcast started.")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/history")
async def get_history(timeframe: str = "1m", limit: int = 200):
    if timeframe not in TIMEFRAMES:
        return {"error": "Invalid timeframe"}
    
    tf_seconds = TIMEFRAMES[timeframe]
    now = int(time.time())
    history = []
    last_close = 1.0855 + (random.random() - 0.5) * 0.01

    for i in range(limit):
        timestamp = get_candle_start_time(now, tf_seconds) - (limit - 1 - i) * tf_seconds
        open_price = last_close
        close_price = open_price + (random.random() - 0.5) * (0.0001 * tf_seconds)
        high_price = max(open_price, close_price) + random.random() * (0.00005 * tf_seconds)
        low_price = min(open_price, close_price) - random.random() * (0.00005 * tf_seconds)
        last_close = close_price
        history.append({
            "time": timestamp, "open": open_price, "high": high_price, "low": low_price, "close": close_price
        })
    return history
