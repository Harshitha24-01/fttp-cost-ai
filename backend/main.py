import logging

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .anomaly_detection import detect_anomaly
from .cost_engine import calculate_cost
from .database import CostRequest, get_db, init_db
from .map_service import LocationNotFoundError, calculate_distance
from .ml_model import predict_cost
from .llm_agent import LLMConfigurationError, generate_ai_suggestions
from .optimization_agent import optimize_cost
from .schemas import (
    CostInputs,
    DetectAnomalyResponse,
    EstimateCostRequest,
    PredictCostResponse,
    SimulateNetworkRequest,
)
from .simulation import simulate_network_build
from .utils import configure_logging, get_settings


settings = get_settings()
configure_logging(settings.log_level)
logger = logging.getLogger("backend")

app = FastAPI(title="AI-Powered FTTP Cost Intelligence Platform")


@app.on_event("startup")
def _startup() -> None:
    init_db()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/estimate-cost")
def estimate_cost(payload: EstimateCostRequest, db: Session = Depends(get_db)):
    try:
        distance_km = calculate_distance(payload.start_location, payload.end_location)
    except LocationNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))

    res = calculate_cost(
        fiber_length=distance_km,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )

    anomaly_status = detect_anomaly(
        fiber_length=distance_km,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )
    is_anomaly = anomaly_status != "Normal"

    db_obj = CostRequest(
        fiber_length=distance_km,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
        predicted_cost=None,
    )
    db.add(db_obj)
    db.commit()

    logger.info("estimate-cost saved request_id=%s anomaly=%s distance_km=%.3f", db_obj.id, is_anomaly, distance_km)
    return {"distance_km": round(distance_km), **res, "anomaly": is_anomaly}


@app.post("/simulate-network")
def simulate_network(payload: SimulateNetworkRequest):
    result = simulate_network_build(
        houses=payload.houses,
        avg_fiber_length_per_house=payload.avg_fiber_length_per_house,
        equipment_cost_per_house=payload.equipment_cost_per_house,
        labour_cost_per_house=payload.labour_cost_per_house,
        civil_cost_per_house=payload.civil_cost_per_house,
    )
    return result


@app.post("/optimize-cost")
def optimize_cost_endpoint(payload: CostInputs):
    suggestions = optimize_cost(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )
    return {"optimization_suggestions": suggestions}


@app.post("/ai-optimize")
async def ai_optimize(payload: CostInputs):
    try:
        return await generate_ai_suggestions(payload.model_dump())
    except LLMConfigurationError as e:
        raise HTTPException(status_code=503, detail=str(e))


@app.post("/predict-cost", response_model=PredictCostResponse)
def predict_cost_endpoint(payload: CostInputs, db: Session = Depends(get_db)) -> PredictCostResponse:
    y_pred = predict_cost(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )

    anomaly_status = detect_anomaly(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )
    is_anomaly = anomaly_status != "Normal"

    db_obj = CostRequest(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
        predicted_cost=y_pred,
    )
    db.add(db_obj)
    db.commit()

    logger.info("predict-cost saved request_id=%s anomaly=%s", db_obj.id, is_anomaly)
    return PredictCostResponse(predicted_cost=y_pred, anomaly=is_anomaly)


@app.post("/detect-anomaly", response_model=DetectAnomalyResponse)
def detect_anomaly_endpoint(payload: CostInputs, db: Session = Depends(get_db)) -> DetectAnomalyResponse:
    status = detect_anomaly(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )

    db_obj = CostRequest(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
        predicted_cost=None,
    )
    db.add(db_obj)
    db.commit()

    logger.info("detect-anomaly saved request_id=%s status=%s", db_obj.id, status)
    return DetectAnomalyResponse(status=status)