from __future__ import annotations

from datetime import datetime
from typing import Dict, Optional

from pydantic import BaseModel, Field


class CostInputs(BaseModel):
    fiber_length: float = Field(..., gt=0)
    premises_count: int = Field(..., ge=1)
    equipment_cost: float = Field(..., ge=0)
    labour_cost: float = Field(..., ge=0)
    civil_cost: float = Field(..., ge=0)


class EstimateCostRequest(BaseModel):
    start_location: str = Field(..., min_length=1)
    end_location: str = Field(..., min_length=1)
    premises_count: int = Field(..., ge=1)
    equipment_cost: float = Field(..., ge=0)
    labour_cost: float = Field(..., ge=0)
    civil_cost: float = Field(..., ge=0)


class SimulateNetworkRequest(BaseModel):
    houses: int = Field(..., ge=1)
    avg_fiber_length_per_house: float = Field(..., gt=0)
    equipment_cost_per_house: float = Field(..., ge=0)
    labour_cost_per_house: float = Field(..., ge=0)
    civil_cost_per_house: float = Field(..., ge=0)


class PredictCostResponse(BaseModel):
    predicted_cost: float
    anomaly: bool


class DetectAnomalyResponse(BaseModel):
    status: str


class CostRequestRecord(BaseModel):
    id: int
    fiber_length: float
    premises_count: int
    equipment_cost: float
    labour_cost: float
    civil_cost: float
    predicted_cost: Optional[float]
    timestamp: datetime

