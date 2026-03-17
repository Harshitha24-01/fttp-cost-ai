from __future__ import annotations


def simulate_network_build(
    houses: int,
    avg_fiber_length_per_house: float,
    equipment_cost_per_house: float,
    labour_cost_per_house: float,
    civil_cost_per_house: float,
) -> dict:
    houses_int = int(houses)
    if houses_int <= 0:
        raise ValueError("houses must be > 0")

    total_fiber_length = houses_int * float(avg_fiber_length_per_house)

    fiber_cost = total_fiber_length * 10000.0
    equipment_cost = houses_int * float(equipment_cost_per_house)
    labour_cost = houses_int * float(labour_cost_per_house)
    civil_cost = houses_int * float(civil_cost_per_house)

    total_cost = fiber_cost + equipment_cost + labour_cost + civil_cost
    cost_per_house = total_cost / houses_int

    return {
        "houses": houses_int,
        "total_fiber_length_km": total_fiber_length,
        "fiber_cost": fiber_cost,
        "equipment_cost": equipment_cost,
        "labour_cost": labour_cost,
        "civil_cost": civil_cost,
        "total_cost": total_cost,
        "cost_per_house": cost_per_house,
    }

