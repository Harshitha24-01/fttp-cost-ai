def calculate_cost(
    fiber_length: float,
    premises_count: int,
    equipment_cost: float,
    labour_cost: float,
    civil_cost: float,
) -> dict:
    fiber_cost = float(fiber_length) * 10000.0

    # per-premises equipment baseline + additional equipment input
    equipment_total = (int(premises_count) * 1500.0) + float(equipment_cost)

    labour_cost_val = float(labour_cost)
    civil_cost_val = float(civil_cost)

    total_cost = fiber_cost + equipment_total + labour_cost_val + civil_cost_val

    return {
        "fiber_cost": fiber_cost,
        "equipment_cost": equipment_total,
        "labour_cost": labour_cost_val,
        "civil_cost": civil_cost_val,
        "total_cost": total_cost,
    }

