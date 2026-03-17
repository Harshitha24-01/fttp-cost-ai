from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

from .ml_model import FEATURE_COLUMNS, _load_dataset
from .utils import get_settings


def _load_or_train_anomaly_model() -> IsolationForest:
    settings = get_settings()
    model_file = Path(settings.anomaly_model_path)
    model_file.parent.mkdir(parents=True, exist_ok=True)

    if model_file.exists():
        return joblib.load(model_file)

    df = _load_dataset()
    X = df[FEATURE_COLUMNS].copy()

    model = IsolationForest(
        n_estimators=300,
        contamination=0.02,
        random_state=42,
    )
    model.fit(X)
    joblib.dump(model, model_file)
    return model


def detect_anomaly(
    fiber_length: float,
    premises_count: int,
    equipment_cost: float,
    labour_cost: float,
    civil_cost: float,
) -> str:
    model = _load_or_train_anomaly_model()

    x = pd.DataFrame(
        [
            {
                "fiber_length": float(fiber_length),
                "premises_count": int(premises_count),
                "equipment_cost": float(equipment_cost),
                "labour_cost": float(labour_cost),
                "civil_cost": float(civil_cost),
            }
        ]
    )

    pred = int(model.predict(x)[0])  # 1=normal, -1=anomaly
    return "Anomaly Detected" if pred == -1 else "Normal"

