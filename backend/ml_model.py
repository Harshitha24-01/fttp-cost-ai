from __future__ import annotations

import os
from pathlib import Path
from typing import Dict, Literal

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
    return Path("data") / "cost_dataset.csv"


def generate_synthetic_cost_dataset(
    n: int = 1000,
    seed: int = 42,
    output_path: str | os.PathLike | None = None,
    noise: Literal["none", "low", "medium"] = "low",
) -> Path:
    """
    Generate a synthetic FTTP cost dataset with columns:
    fiber_length, premises_count, equipment_cost, labour_cost, civil_cost, total_cost
    and write it to `data/cost_dataset.csv` by default.
    """
    _ensure_dirs()
    path = Path(output_path) if output_path else _default_dataset_path()
    path.parent.mkdir(parents=True, exist_ok=True)

    rng = np.random.default_rng(seed)

    # Reasonable-ish ranges for synthetic data; tune freely.
    fiber_length = rng.uniform(0.1, 30.0, size=n)  # km
    premises_count = rng.integers(1, 1500, size=n)

    # Costs are correlated with size, but retain variance.
    labour_cost = (premises_count * rng.uniform(60.0, 180.0, size=n)) + rng.uniform(2_000, 80_000, size=n)
    civil_cost = (fiber_length * rng.uniform(2_000.0, 9_000.0, size=n)) + rng.uniform(2_000, 120_000, size=n)

    # Equipment: baseline per premises plus some project variability.
    equipment_cost = (premises_count * rng.uniform(900.0, 2200.0, size=n)) + rng.uniform(0, 50_000, size=n)

    if noise == "none":
        noise_scale = 0.0
    elif noise == "low":
        noise_scale = 0.03
    else:
        noise_scale = 0.08

    rows: list[dict[str, float | int]] = []
    for i in range(n):
        res = calculate_cost(
            fiber_length=float(fiber_length[i]),
            premises_count=int(premises_count[i]),
            equipment_cost=float(equipment_cost[i]),
            labour_cost=float(labour_cost[i]),
            civil_cost=float(civil_cost[i]),
        )
        total = float(res["total_cost"])
        if noise_scale:
            total = float(total * (1.0 + rng.normal(0.0, noise_scale)))
        rows.append(
            {
                "fiber_length": float(fiber_length[i]),
                "premises_count": int(premises_count[i]),
                "equipment_cost": float(equipment_cost[i]),
                "labour_cost": float(labour_cost[i]),
                "civil_cost": float(civil_cost[i]),
                "total_cost": total,
            }
        )

    df = pd.DataFrame(rows)
    df.to_csv(path, index=False)
    return path


def _load_dataset(dataset_path: Path | None = None) -> pd.DataFrame:
    _ensure_dirs()
    path = dataset_path or _default_dataset_path()

    if path.exists():
        df = pd.read_csv(path)
        return df

    generate_synthetic_cost_dataset(n=1000, seed=42, output_path=path)
    return pd.read_csv(path)


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


if __name__ == "__main__":
    # One-command training: writes `data/cost_dataset.csv` and `models/cost_model.pkl` by default.
    info = train_and_save_model()
    print(f"Trained cost model. r2={info['r2']:.4f} saved={info['model_path']}")

