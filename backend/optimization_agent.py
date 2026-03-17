from __future__ import annotations


def optimize_cost(
    fiber_length: float,
    premises_count: int,
    equipment_cost: float,
    labour_cost: float,
    civil_cost: float,
) -> list[str]:
    suggestions: list[str] = []

    fiber_length_val = float(fiber_length)
    premises_count_val = int(premises_count)
    equipment_cost_val = float(equipment_cost)
    civil_cost_val = float(civil_cost)

    if fiber_length_val > 3.0:
        suggestions.append("Fiber route is long. Evaluate alternate routing or a closer distribution node.")

    if civil_cost_val > 50000.0:
        suggestions.append("Civil work cost is high. Consider micro-trenching or aerial fiber installation.")

    if premises_count_val > 0 and equipment_cost_val > premises_count_val * 2000.0:
        suggestions.append("Equipment cost is high for the premises count. Consider shared splitters or equipment optimization.")

    # Simple proxy for density: premises per km of fiber.
    # If it's low, underground civils can be disproportionately expensive.
    if fiber_length_val > 0:
        density_premises_per_km = premises_count_val / fiber_length_val
        if density_premises_per_km < 50:
            suggestions.append("Premises density appears low. Consider aerial fiber instead of underground trenching.")

    return suggestions

