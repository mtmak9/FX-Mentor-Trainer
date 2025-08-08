from fastapi import FastAPI, WebSocket
import pandas as pd
import numpy as np
from pydantic import BaseModel
import joblib
import os

app = FastAPI()
model_path = os.getenv("MODEL_PATH", "model/model.pkl")
model = joblib.load(model_path)

class MarketData(BaseModel):
    price: float
    volume: float
    timestamp: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    while True:
        data = await ws.receive_json()
        df = pd.DataFrame([data])
        prediction = model.predict(df[["price", "volume"]])[0]
        await ws.send_json({"prediction": prediction})