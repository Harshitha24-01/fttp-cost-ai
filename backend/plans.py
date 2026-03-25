from __future__ import annotations

from fastapi import APIRouter, Depends

from .auth import require_roles


router = APIRouter(tags=["plans"])


PLAN_DATA = [
    {"name": "Basic", "speed": "100 Mbps", "price": 499},
    {"name": "Standard", "speed": "300 Mbps", "price": 799},
    {"name": "Premium", "speed": "500 Mbps", "price": 999},
]


@router.get("/plans")
def get_plans(user=Depends(require_roles({"User"}))):
    # Returns static plan catalogue for User role.
    return {"plans": PLAN_DATA}

