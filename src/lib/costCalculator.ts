export interface CostInput {
  source: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  premisesCount: number;
  workers: number;
  wagePerDay: number;
  workingDays: number;
  deploymentType: "underground" | "aerial";
  arpu: number;
  budget?: number;
}

export interface MaterialItem {
  name: string;
  unit: string;
  unitCost: number;
  quantity: number;
  total: number;
}

export interface CostBreakdown {
  fiber: number;
  equipment: number;
  labour: number;
  civil: number;
  materials: MaterialItem[];
}

export interface CostResult {
  distance: number;
  totalCost: number;
  materialCost: number;
  labourCost: number;
  deploymentCost: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  durationDays: number;
  terrain: "urban" | "rural" | "hilly";
  terrainMultiplier: number;
  breakdown: CostBreakdown;
  optimizations: string[];
  explanation: string;
  riskFlags: string[];
  workforceOptimization: {
    optimalWorkers: number;
    currentCost: number;
    optimizedCost: number;
    savingsPercent: number;
    additionalDays: number;
  };
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function detectTerrain(lat: number, lng: number): "urban" | "rural" | "hilly" {
  // Simulate terrain based on coordinates
  // Major metro areas = urban, hilly regions (Western Ghats, Himalayas), rest = rural
  const urbanCenters = [
    { lat: 19.076, lng: 72.877, r: 0.3 }, // Mumbai
    { lat: 28.614, lng: 77.209, r: 0.3 }, // Delhi
    { lat: 12.972, lng: 77.595, r: 0.25 }, // Bengaluru
    { lat: 13.083, lng: 80.271, r: 0.2 }, // Chennai
    { lat: 17.385, lng: 78.487, r: 0.25 }, // Hyderabad
    { lat: 22.573, lng: 88.364, r: 0.2 }, // Kolkata
    { lat: 18.520, lng: 73.857, r: 0.2 }, // Pune
    { lat: 23.023, lng: 72.571, r: 0.2 }, // Ahmedabad
  ];
  for (const c of urbanCenters) {
    const d = Math.sqrt((lat - c.lat) ** 2 + (lng - c.lng) ** 2);
    if (d < c.r) return "urban";
  }
  // Hilly: Western Ghats, Northeast, Himalayas
  if ((lat > 30 && lng < 80) || (lat > 25 && lng > 90) || (lat < 15 && lng < 76 && lng > 73)) return "hilly";
  return "rural";
}

export function calculateCost(input: CostInput): CostResult | null {
  if (!input.source || !input.destination) return null;

  const distance = haversineDistance(input.source.lat, input.source.lng, input.destination.lat, input.destination.lng);
  const terrain = detectTerrain(
    (input.source.lat + input.destination.lat) / 2,
    (input.source.lng + input.destination.lng) / 2
  );
  const terrainMultiplier = terrain === "urban" ? 1.3 : terrain === "hilly" ? 1.6 : 1.0;

  // Materials — realistic Indian market rates
  const fiberQty = Math.ceil(distance);
  const fiberCost = 6500; // ₹6.5K/km for fiber cable
  const oltCount = Math.max(1, Math.ceil(input.premisesCount / 64));
  const oltCost = 120000; // ₹1.2L per OLT
  const ontCount = input.premisesCount;
  const ontCost = 1800; // ₹1.8K per ONT (bulk pricing)
  const splitterCount = Math.max(1, Math.ceil(input.premisesCount / 8));
  const splitterCost = 2500;
  const jointCount = Math.max(1, Math.ceil(distance / 2));
  const jointCost = 3000;
  const ductQty = Math.ceil(distance);
  const ductCost = 8000; // ₹8K/km for duct/trenching
  const materials: MaterialItem[] = [
    { name: "Fiber Optic Cable", unit: "km", unitCost: fiberCost, quantity: fiberQty, total: fiberQty * fiberCost },
    { name: "OLT", unit: "unit", unitCost: oltCost, quantity: oltCount, total: oltCount * oltCost },
    { name: "ONT (per premise)", unit: "unit", unitCost: ontCost, quantity: ontCount, total: ontCount * ontCost },
    { name: "Splitters (1:8)", unit: "unit", unitCost: splitterCost, quantity: splitterCount, total: splitterCount * splitterCost },
    { name: "Joint Closures", unit: "unit", unitCost: jointCost, quantity: jointCount, total: jointCount * jointCost },
    { name: "Duct / Trenching", unit: "km", unitCost: ductCost, quantity: ductQty, total: ductQty * ductCost },
  ];

  const materialCost = materials.reduce((s, m) => s + m.total, 0) * terrainMultiplier;
  const labourCost = input.workers * input.wagePerDay * input.workingDays;
  const deploymentMultiplier = input.deploymentType === "underground" ? 1.0 : 0.55;
  const civilBase = distance * 10000 * terrainMultiplier; // ₹10K/km base civil cost
  const deploymentCost = civilBase * deploymentMultiplier;

  const fiber = fiberQty * fiberCost * terrainMultiplier;
  const equipment = ((oltCount * oltCost) + (ontCount * ontCost) + (splitterCount * splitterCost) + (jointCount * jointCost)) * terrainMultiplier;

  const totalCost = materialCost + labourCost + deploymentCost;
  const revenue = input.arpu * input.premisesCount * 12 * 5; // 5-year revenue projection
  const profit = revenue - totalCost;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  // ROI phase messaging handled in UI layer
  const durationDays = Math.ceil((distance * 3) / Math.max(1, input.workers));

  // Workforce optimization
  const optimalWorkers = Math.max(5, Math.ceil(distance * 0.8));
  const optimizedLabour = optimalWorkers * input.wagePerDay * input.workingDays;
  const optimizedTotal = materialCost + optimizedLabour + deploymentCost;
  const savingsPercent = totalCost > 0 ? ((totalCost - optimizedTotal) / totalCost) * 100 : 0;
  const additionalDays = Math.ceil((distance * 3) / Math.max(1, optimalWorkers)) - durationDays;

  // Risk flags
  const riskFlags: string[] = [];
  if (totalCost > input.premisesCount * 80000) riskFlags.push("High cost per premise — review deployment strategy");
  if (input.workers < 5 && distance > 10) riskFlags.push("Low workforce for given distance — risk of delays");
  if (input.budget && totalCost > input.budget) riskFlags.push(`Budget overflow: ₹${formatCurrency(totalCost - input.budget)} over budget`);
  if (profitMargin < 0) riskFlags.push("Negative ROI — consider reducing scope or increasing ARPU");
  if (terrain === "hilly") riskFlags.push("Hilly terrain increases costs by 2.2x — explore aerial alternatives");

  // Optimizations
  const optimizations: string[] = [];
  if (input.deploymentType === "underground" && distance > 15) {
    optimizations.push("Switch to aerial deployment to save up to 40% on civil works.");
  }
  if (input.premisesCount < 50) {
    optimizations.push("Low premise density — consider shared infrastructure with adjacent zones.");
  }
  if (input.workers > optimalWorkers + 5) {
    optimizations.push(`Reduce workforce from ${input.workers} to ${optimalWorkers} — saves ${savingsPercent.toFixed(0)}% with ${Math.abs(additionalDays)} extra days.`);
  }
  if (terrain === "hilly" && input.deploymentType === "underground") {
    optimizations.push("Use aerial fiber in hilly terrain to avoid expensive trenching.");
  }
  if (distance < 5) {
    optimizations.push("Micro-trenching can reduce civil costs by 30% for short distances.");
  }
  if (optimizations.length === 0) {
    optimizations.push("Current configuration appears cost-optimal.");
  }

  // Explanation
  const costInLakhs = totalCost / 100000;
  let explanation = "";
  if (totalCost > 5000000) {
    explanation = `High-investment deployment at ₹${costInLakhs.toFixed(1)}L driven primarily by ${fiber > deploymentCost ? "fiber material costs" : "civil works"}. ${terrain === "hilly" ? "Hilly terrain adds significant premium." : ""} Consider phased rollout to manage cash flow.`;
  } else if (totalCost > 1000000) {
    explanation = `Moderate deployment at ₹${costInLakhs.toFixed(1)}L. Cost per premise: ₹${(totalCost / input.premisesCount).toFixed(0)}. ${terrain} terrain with ${input.deploymentType} deployment.`;
  } else {
    explanation = `Cost-effective deployment at ₹${(totalCost / 1000).toFixed(0)}K. Compact footprint keeps costs manageable. Good ROI potential.`;
  }

  return {
    distance, totalCost, materialCost, labourCost, deploymentCost, revenue, profit, profitMargin, durationDays, terrain, terrainMultiplier,
    breakdown: { fiber, equipment, labour: labourCost, civil: deploymentCost, materials },
    optimizations, explanation, riskFlags,
    workforceOptimization: { optimalWorkers, currentCost: totalCost, optimizedCost: optimizedTotal, savingsPercent, additionalDays },
  };
}

export function calculateBudgetFeasibility(budget: number, deploymentType: "underground" | "aerial", workers: number, wagePerDay: number, workingDays: number, arpu: number) {
  const labourCost = workers * wagePerDay * workingDays;
  const remainingBudget = budget - labourCost;
  if (remainingBudget <= 0) return { maxDistance: 0, bestType: deploymentType, requiredWorkers: workers };
  const costPerKm = (8500 + 12000 + 15000 * (deploymentType === "underground" ? 1 : 0.6));
  const maxDistance = remainingBudget / costPerKm;
  return { maxDistance: Math.max(0, maxDistance), bestType: maxDistance < 5 ? "aerial" as const : deploymentType, requiredWorkers: Math.max(5, Math.ceil(maxDistance * 0.8)) };
}

export function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
}
