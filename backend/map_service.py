from __future__ import annotations

from functools import lru_cache

from geopy.distance import geodesic
from geopy.geocoders import Nominatim


class LocationNotFoundError(ValueError):
    pass


@lru_cache(maxsize=512)
def _geocode(query: str) -> tuple[float, float]:
    geolocator = Nominatim(user_agent="fttp-cost-ai", timeout=10)
    loc = geolocator.geocode(query)
    if not loc:
        raise LocationNotFoundError(f"Location not found: {query}")
    return float(loc.latitude), float(loc.longitude)


def calculate_distance(start_location: str, end_location: str) -> float:
    """
    Convert two free-text locations into coordinates and return geodesic distance in km.
    """
    start = _geocode(start_location)
    end = _geocode(end_location)
    return float(geodesic(start, end).km)

