import logging

from fastapi import Depends, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from .auth import get_current_user, router as auth_router
from .cost_engine import calculate_cost
from .database import get_db, init_db, save_request
from .plans import router as plans_router
from .map_service import LocationNotFoundError, calculate_distance
from .ml_model import predict_cost
from .llm_agent import LLMConfigurationError, explain_cost, optimize_cost as optimize_cost_ai
from .profit_engine import calculate_profit
from .schemas import CostInputs, EstimateCostRequest
from .utils import configure_logging, get_settings


settings = get_settings()
configure_logging(settings.log_level)
logger = logging.getLogger("backend")

app = FastAPI(title="AI-Powered FTTP Cost Intelligence Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(plans_router)


@app.on_event("startup")
def _startup() -> None:
    init_db()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/favicon.ico", include_in_schema=False)
def favicon() -> Response:
    # Avoid noisy 404s from browsers requesting a favicon.
    return Response(status_code=204)


@app.post("/estimate-cost")
def estimate_cost(
    payload: EstimateCostRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    try:
        distance_km = calculate_distance(payload.source, payload.destination)
    except LocationNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))

    cost = calculate_cost(
        fiber_length=distance_km,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )

    save_request(
        db,
        fiber_length=distance_km,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
        total_cost=float(cost["total_cost"]),
    )

    logger.info("estimate-cost saved distance_km=%.3f", distance_km)
    profit = calculate_profit(
        total_cost=float(cost["total_cost"]),
        revenue_per_user=payload.revenue_per_user,
        premises_count=payload.premises_count,
    )

    return {
        "distance_km": float(round(distance_km, 3)),
        **cost,
        **profit,
    }


class ExplainCostRequest(BaseModel):
    data: CostInputs
    total_cost: float = Field(..., ge=0)


class GenerateReportRequest(BaseModel):
    data: CostInputs
    total_cost: float = Field(..., ge=0)


class ChatInputRequest(BaseModel):
    text: str = Field(..., min_length=1)


@app.post("/explain-cost")
def explain_cost_endpoint(
    payload: ExplainCostRequest,
    user=Depends(get_current_user),
):
    try:
        explanation = explain_cost(payload.data.model_dump(), payload.total_cost)
        return {"explanation": explanation}
    except LLMConfigurationError as e:
        raise HTTPException(status_code=503, detail=str(e))


@app.post("/optimize-cost-ai")
def optimize_cost_ai_endpoint(
    payload: CostInputs,
    user=Depends(get_current_user),
):
    try:
        suggestions = optimize_cost_ai(payload.model_dump())
        return {"suggestions": suggestions}
    except LLMConfigurationError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        # Avoid opaque "Internal Server Error" for LLM-related failures
        raise HTTPException(status_code=503, detail=str(e))


@app.post("/predict-cost")
def predict_cost_endpoint(
    payload: CostInputs,
    user=Depends(get_current_user),
) -> dict:
    predicted = predict_cost(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )

    rule = calculate_cost(
        fiber_length=payload.fiber_length,
        premises_count=payload.premises_count,
        equipment_cost=payload.equipment_cost,
        labour_cost=payload.labour_cost,
        civil_cost=payload.civil_cost,
    )
    return {"predicted_cost": float(predicted), "rule_based_total_cost": float(rule["total_cost"])}