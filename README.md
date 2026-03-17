# AI-Powered FTTP Cost Intelligence Platform (Backend)

Backend service that estimates FTTP (Fiber To The Premises) build cost using:
- Rule-based cost engine (deterministic calculation)
- Machine learning model (RandomForestRegressor)
- Anomaly detection (IsolationForest)
- SQLite persistence via SQLAlchemy (dev-friendly)

## Quickstart

Create and activate a virtual environment, install deps, then run:

```bash
uvicorn backend.main:app --reload
```

Open Swagger UI at `http://127.0.0.1:8000/docs`.

## Project structure

```
fttp-cost-ai/
  backend/
    main.py                # FastAPI app entrypoint
    routes.py              # API endpoints
    cost_engine.py         # Rule-based cost calculation
    ml_model.py            # Model training + prediction utilities
    anomaly_detection.py   # Cost anomaly detection (IsolationForest)
    database.py            # SQLAlchemy engine/session + models
    schemas.py             # Pydantic request/response models
    utils.py               # settings + logging helpers
  data/
    dataset.csv            # sample training dataset
  models/
    cost_model.pkl         # trained ML model (generated)
  requirements.txt
  .gitignore
  README.md
```

## Environment variables

Optionally set:
- `DATABASE_URL` (default: `sqlite:///./backend.db`)
- `MODEL_PATH` (default: `models/cost_model.pkl`)
- `ANOMALY_MODEL_PATH` (default: `models/anomaly_model.pkl`)
- `LOG_LEVEL` (default: `INFO`)

