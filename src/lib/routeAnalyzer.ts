/**
 * Route Analyzer Module
 * Generates multiple routes between source and destination,
 * classifies them by type, and calculates cost/risk/environmental impact.
 */

export type RouteType = "shortest" | "low_cost" | "risky" | "eco_friendly";
export type RiskLevel = "low" | "medium" | "high";
export type EnvImpact = "low" | "medium" | "high";

export interface AnalyzedRoute {
  type: RouteType;
  label: string;
  color: string;
  distance_km: number;
  estimated_cost: number;
  estimated_profit: number;
  risk_level: RiskLevel;
  environmental_impact: EnvImpact;
  terrain: string;
  coordinates: [number, number][];
  description: string;
}

export interface RouteAnalysisResult {
  routes: AnalyzedRoute[];
  best_route: RouteType;
  best_reason: string;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Generate varied waypoints to simulate different route paths */
function generateWaypoints(
  src: { lat: number; lng: number },
  dst: { lat: number; lng: number },
  offset: number,
  numPoints: number
): [number, number][] {
  const coords: [number, number][] = [[src.lat, src.lng]];
  const latDiff = dst.lat - src.lat;
  const lngDiff = dst.lng - src.lng;
  // perpendicular direction
  const perpLat = -lngDiff;
  const perpLng = latDiff;
  const norm = Math.sqrt(perpLat ** 2 + perpLng ** 2) || 1;

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    // Sine curve offset from straight line
    const curveAmount = Math.sin(t * Math.PI) * offset;
    const lat = src.lat + latDiff * t + (perpLat / norm) * curveAmount;
    const lng = src.lng + lngDiff * t + (perpLng / norm) * curveAmount;
    coords.push([lat, lng]);
  }
  coords.push([dst.lat, dst.lng]);
  return coords;
}

function calculateRouteDistance(coords: [number, number][]): number {
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    total += haversine(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1]);
  }
  return total;
}

function analyzeEnvironmentalImpact(
  coords: [number, number][]
): { impact: EnvImpact; terrain: string } {
  // Simulate: check midpoint for urban/forest/highway characteristics
  const mid = coords[Math.floor(coords.length / 2)];
  const lat = mid[0];
  const lng = mid[1];

  // Urban metro centers (high cost, medium env impact)
  const urbanCenters = [
    { lat: 19.076, lng: 72.877 }, { lat: 28.614, lng: 77.209 },
    { lat: 12.972, lng: 77.595 }, { lat: 13.083, lng: 80.271 },
    { lat: 17.385, lng: 78.487 }, { lat: 22.573, lng: 88.364 },
  ];
  for (const c of urbanCenters) {
    if (Math.sqrt((lat - c.lat) ** 2 + (lng - c.lng) ** 2) < 0.3) {
      return { impact: "high", terrain: "Urban Area" };
    }
  }

  // Forest areas (Western Ghats, Northeast) — high restriction
  if ((lat < 15 && lng < 76 && lng > 73) || (lat > 25 && lng > 90)) {
    return { impact: "high", terrain: "Forest/Protected Area" };
  }

  // Highway corridors
  if (lat > 18 && lat < 22 && lng > 72 && lng < 80) {
    return { impact: "low", terrain: "Highway Corridor" };
  }

  return { impact: "medium", terrain: "Semi-Urban/Rural" };
}

function calculateRouteCost(distance: number, terrain: string, deploymentType: string): number {
  const baseCostPerKm = 45000; // ₹45K per km base (realistic Indian FTTP market rate)
  let multiplier = 1.0;
  if (terrain.includes("Urban")) multiplier = 1.8;
  else if (terrain.includes("Forest")) multiplier = 2.5;
  else if (terrain.includes("Highway")) multiplier = 0.7;
  else multiplier = 1.2;

  if (deploymentType === "aerial") multiplier *= 0.6;
  return Math.round(distance * baseCostPerKm * multiplier);
}

export function generateRoutes(
  source: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  premisesCount = 500,
  arpu = 500
): RouteAnalysisResult {
  const directDist = haversine(source.lat, source.lng, destination.lat, destination.lng);
  const offsetScale = directDist * 0.008; // scale offsets based on distance

  // 1. Shortest Path — nearly straight line
  const shortestCoords = generateWaypoints(source, destination, offsetScale * 0.1, 5);
  const shortestDist = calculateRouteDistance(shortestCoords);
  const shortestEnv = analyzeEnvironmentalImpact(shortestCoords);
  const shortestCost = calculateRouteCost(shortestDist, shortestEnv.terrain, "underground");

  // 2. Low Cost Path — highway-following route (slight curve)
  const lowCostCoords = generateWaypoints(source, destination, -offsetScale * 0.6, 6);
  const lowCostDist = calculateRouteDistance(lowCostCoords);
  const lowCostCost = Math.round(shortestCost * 0.65); // simulated cheaper

  // 3. Risky Path — through challenging terrain
  const riskyCoords = generateWaypoints(source, destination, offsetScale * 1.2, 7);
  const riskyDist = calculateRouteDistance(riskyCoords);
  const riskyCost = Math.round(shortestCost * 0.5);

  // 4. Eco-Friendly Path — avoids urban, goes around
  const ecoCoords = generateWaypoints(source, destination, -offsetScale * 1.0, 8);
  const ecoDist = calculateRouteDistance(ecoCoords);
  const ecoCost = Math.round(shortestCost * 0.85);

  const revenue = arpu * premisesCount * 12 * 5;

  const routes: AnalyzedRoute[] = [
    {
      type: "shortest",
      label: "Shortest Path",
      color: "#22c55e",
      distance_km: Math.round(shortestDist * 10) / 10,
      estimated_cost: shortestCost,
      estimated_profit: revenue - shortestCost,
      risk_level: "low",
      environmental_impact: shortestEnv.impact,
      terrain: shortestEnv.terrain,
      coordinates: shortestCoords,
      description: "Direct route minimizing distance. May pass through urban areas with higher deployment costs.",
    },
    {
      type: "low_cost",
      label: "Low Cost Path",
      color: "#3b82f6",
      distance_km: Math.round(lowCostDist * 10) / 10,
      estimated_cost: lowCostCost,
      estimated_profit: revenue - lowCostCost,
      risk_level: "low",
      environmental_impact: "low",
      terrain: "Highway Corridor",
      coordinates: lowCostCoords,
      description: "Follows existing highway infrastructure, reducing civil works cost significantly.",
    },
    {
      type: "risky",
      label: "Risky Path",
      color: "#ef4444",
      distance_km: Math.round(riskyDist * 10) / 10,
      estimated_cost: riskyCost,
      estimated_profit: revenue - riskyCost,
      risk_level: "high",
      environmental_impact: "high",
      terrain: "Mixed Terrain",
      coordinates: riskyCoords,
      description: "Cheapest option but passes through challenging terrain with higher failure risk and environmental concerns.",
    },
    {
      type: "eco_friendly",
      label: "Eco-Friendly Path",
      color: "#14b8a6",
      distance_km: Math.round(ecoDist * 10) / 10,
      estimated_cost: ecoCost,
      estimated_profit: revenue - ecoCost,
      risk_level: "medium",
      environmental_impact: "low",
      terrain: "Semi-Urban/Rural",
      coordinates: ecoCoords,
      description: "Avoids protected areas and minimizes environmental disruption while maintaining reasonable cost.",
    },
  ];

  // Determine best route using Business Score (cost + risk + environment + profit)
  const scored = routes.map((r) => {
    let score = 0;
    score -= r.estimated_cost / 100000; // lower cost = better
    score += r.estimated_profit / 500000; // higher profit = better
    if (r.risk_level === "low") score += 8;
    else if (r.risk_level === "medium") score += 3;
    else score -= 2;
    if (r.environmental_impact === "low") score += 5;
    else if (r.environmental_impact === "medium") score += 2;
    else score -= 1;
    score -= r.distance_km / 50; // shorter distance bonus
    return { type: r.type, score, businessScore: Math.max(0, Math.min(100, 50 + score * 3)) };
  });
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  const bestRoute = routes.find((r) => r.type === best.type)!;
  const bestReason = `${bestRoute.label} offers the best balance: ${bestRoute.risk_level} risk, ${bestRoute.environmental_impact} environmental impact, at ${formatINR(bestRoute.estimated_cost)}.`;

  return { routes, best_route: best.type, best_reason: bestReason };
}

function formatINR(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L`;
  return `₹${(v / 1000).toFixed(1)}K`;
}
