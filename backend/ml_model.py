from __future__ import annotations

import os
from pathlib import Path
from typing import Dict

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from .cost_engine import calculate_cost
from .utils import get_settings


FEATURE_COLUMNS = [
    "fiber_length",
    "premises_count",
    "equipment_cost",
    "labour_cost",
    "civil_cost",
]
TARGET_COLUMN = "total_cost"


def _ensure_dirs() -> None:
    Path("models").mkdir(parents=True, exist_ok=True)
    Path("data").mkdir(parents=True, exist_ok=True)


def _default_dataset_path() -> Path:
    return Path("data") / "dataset.csv"


def _load_dataset(dataset_path: Path | None = None) -> pd.DataFrame:
    _ensure_dirs()
    path = dataset_path or _default_dataset_path()

    if path.exists():
        df = pd.read_csv(path)
        return df

    # Create a small synthetic dataset so the project is runnable out-of-the-box.
    rng = np.random.default_rng(42)
    n = 300

    fiber_length = rng.uniform(0.5, 20.0, size=n)  # km (example scale)
    premises_count = rng.integers(1, 500, size=n)
    labour_cost = rng.uniform(5_000, 150_000, size=n)
    civil_cost = rng.uniform(5_000, 250_000, size=n)

    # Spec says equipment_cost input is overridden; keep a column anyway.
    equipment_cost = premises_count * 1500.0

    rows = []
    for i in range(n):
        res = calculate_cost(
            fiber_length=float(fiber_length[i]),
            premises_count=int(premises_count[i]),
            equipment_cost=float(equipment_cost[i]),
            labour_cost=float(labour_cost[i]),
            civil_cost=float(civil_cost[i]),
        )
        rows.append(
            {
                "fiber_length": float(fiber_length[i]),
                "premises_count": int(premises_count[i]),
                "equipment_cost": float(equipment_cost[i]),
                "labour_cost": float(labour_cost[i]),
                "civil_cost": float(civil_cost[i]),
                "total_cost": float(res.total_cost),
            }
        )

    df = pd.DataFrame(rows)
    df.to_csv(path, index=False)
    return df


def train_and_save_model(
    dataset_path: str | os.PathLike | None = None,
    model_path: str | os.PathLike | None = None,
) -> Dict[str, float]:
    settings = get_settings()
    _ensure_dirs()

    model_file = Path(model_path) if model_path else Path(settings.model_path)
    model_file.parent.mkdir(parents=True, exist_ok=True)

    df = _load_dataset(Path(dataset_path) if dataset_path else None)
    missing = [c for c in FEATURE_COLUMNS + [TARGET_COLUMN] if c not in df.columns]
    if missing:
        raise ValueError(f"Dataset missing columns: {missing}")

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=300, random_state=42)
    model.fit(X_train, y_train)

    r2 = float(model.score(X_test, y_test))
    joblib.dump(model, model_file)
    return {"r2": r2, "model_path": str(model_file)}


def _load_or_train_model() -> RandomForestRegressor:
    settings = get_settings()
    model_file = Path(settings.model_path)
    if model_file.exists():
        return joblib.load(model_file)
    train_and_save_model()
    return joblib.load(model_file)


def predict_cost(
    fiber_length: float,
    premises_count: int,
    equipment_cost: float,
    labour_cost: float,
    civil_cost: float,
) -> float:
    model = _load_or_train_model()
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
    y_pred = model.predict(x)[0]
    return float(y_pred)

