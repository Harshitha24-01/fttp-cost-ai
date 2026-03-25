from __future__ import annotations

from typing import TypedDict


class ProfitResult(TypedDict):
    total_revenue: float
    profit: float
    profit_margin: float


def calculate_profit(total_cost: float, revenue_per_user: float, premises_count: int) -> ProfitResult:
    total_revenue = float(revenue_per_user) * int(premises_count)
    profit = total_revenue - float(total_cost)
    profit_margin = (profit / total_revenue) * 100.0 if total_revenue else 0.0
    return {
        "total_revenue": total_revenue,
        "profit": profit,
        "profit_margin": profit_margin,
    }

