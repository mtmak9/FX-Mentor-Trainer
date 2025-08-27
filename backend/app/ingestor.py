import time
import requests
import redis
import logging
import os
import json
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)
logging.info(f"Connecting to Redis at {REDIS_HOST}:{REDIS_PORT}")

def get_truefx_data():
    url = 'https://webrates.truefx.com/rates/connect.html?f=html&c=EUR/USD'
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text.strip(), 'html.parser')
            cells = soup.find_all('td')
            if len(cells) >= 6:
                timestamp_ms = int(cells[1].text)
                timestamp_s = timestamp_ms // 1000
                bid = float(cells[2].text + cells[3].text)
                ask = float(cells[4].text + cells[5].text)
                price = (bid + ask) / 2
                return {"price": price, "timestamp": timestamp_s}
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data from TrueFX: {e}")
    return None

def main():
    logging.info("Data Ingestor started.")
    while True:
        data = get_truefx_data()
        if data:
            message = json.dumps(data)
            r.publish('market_data', message)
            logging.info(f"Published to Redis: {message}")
        
        # POPRAWKA: Zmniejszono interwał do 1 sekundy
        time.sleep(1)

if __name__ == "__main__":
    main()
