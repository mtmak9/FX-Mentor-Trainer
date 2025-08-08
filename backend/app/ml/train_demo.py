# backend/app/ml/train_demo.py
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import xgboost as xgb
from joblib import dump
from pathlib import Path

# generate synthetic data
N = 10000
np.random.seed(42)
prices = np.cumsum(np.random.normal(0, 0.0005, N)) + 1.1
returns = np.concatenate([[0], (prices[1:]-prices[:-1])/prices[:-1]])
X = returns[:-1].reshape(-1,1)
y = (returns[1:] > 0).astype(int)

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, shuffle=False)

dtrain = xgb.DMatrix(X_train, label=y_train)
dval = xgb.DMatrix(X_val, label=y_val)
params = {"objective":"binary:logistic", "eval_metric":"logloss", "max_depth":3}
model = xgb.train(params, dtrain, num_boost_round=50)

model_dir = Path(__file__).parent.parent / "model"
model_dir.mkdir(parents=True, exist_ok=True)

dump(model, model_dir / "model.pkl")
print("Model saved to", model_dir / "model.pkl")