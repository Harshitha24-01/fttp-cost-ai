// Budget Engine — realistic FTTP financial planning module
// Calibrated against Indian telecom benchmarks (Jio/Airtel)

export type DeploymentType = "underground" | "aerial" | "hybrid";

export interface BudgetInput {
  budget: number;
  premises: number;
  distanceKm: number;
  deploymentType: DeploymentType;
  workers: number;
  wagePerDay: number;
  workingDays: number;
  arpu: number;
  adoptionRate: number; // 0–1
}

export interface CapexBreakdown {
  fiberCable: number;
  equipment: number;
  civilWork: number;
  installation: number;
  total: number;
}

export interface OpexBreakdown {
  maintenance: number;
  power: number;
  workforce: number;
  repair: number;
  total: number;
}

export interface FinancialResult {
  capex: CapexBreakdown;
  opex: OpexBreakdown;
  totalInvestment: number; // capex + year-1 opex
  annualRevenue: number;
  fiveYearRevenue: number;
  profit: number;
  roi: number; // percentage
  paybackMonths: number;
  breakEvenPremises: number;
  budgetUsed: number;
  budgetPercent: number;
  budgetStatus: "healthy" | "moderate" | "critical";
  recommendations: string[];
  costPerPremise: number;
}

// ---- Rate cards (₹, Indian market 2024) ----
const RATES = {
  fiberPerKm: { underground: 8500, aerial: 5200, hybrid: 6800 },
  civilPerKm: { underground: 18000, aerial: 4500, hybrid: 11000 },
  oltCost: 125000,       // per OLT (serves 64 premises)
  ontCost: 1900,         // per premise
  splitterCost: 2600,    // per 1:8 splitter
  installPerPremise: 1200,
  maintenancePerKmYear: 3500,
  powerPerPremiseYear: 420,
  repairPerKmYear: 1800,
};

export function calculateCapex(input: BudgetInput): CapexBreakdown {
  const { premises, distanceKm, deploymentType } = input;
  const fiberCable = Math.ceil(distanceKm) * RATES.fiberPerKm[deploymentType];
  const oltCount = Math.max(1, Math.ceil(premises / 64));
  const splitterCount = Math.max(1, Math.ceil(premises / 8));
  const equipment =
    oltCount * RATES.oltCost +
    premises * RATES.ontCost +
    splitterCount * RATES.splitterCost;
  const civilWork = Math.ceil(distanceKm) * RATES.civilPerKm[deploymentType];
  const installation = premises * RATES.installPerPremise;
  return { fiberCable, equipment, civilWork, installation, total: fiberCable + equipment + civilWork + installation };
}

export function calculateOpex(input: BudgetInput): OpexBreakdown {
  const { premises, distanceKm, workers, wagePerDay, workingDays } = input;
  const maintenance = Math.ceil(distanceKm) * RATES.maintenancePerKmYear;
  const power = premises * RATES.powerPerPremiseYear;
  const workforce = workers * wagePerDay * workingDays;
  const repair = Math.ceil(distanceKm) * RATES.repairPerKmYear;
  return { maintenance, power, workforce, repair, total: maintenance + power + workforce + repair };
}

export function calculateFinancials(input: BudgetInput): FinancialResult {
  const capex = calculateCapex(input);
  const opex = calculateOpex(input);
  const totalInvestment = capex.total + opex.total;

  const subscribedPremises = Math.floor(input.premises * input.adoptionRate);
  const annualRevenue = subscribedPremises * input.arpu * 12;
  const fiveYearRevenue = annualRevenue * 5;

  const fiveYearCost = capex.total + opex.total * 5;
  const profit = fiveYearRevenue - fiveYearCost;
  const roi = fiveYearCost > 0 ? ((fiveYearRevenue - fiveYearCost) / fiveYearCost) * 100 : 0;

  const monthlyProfit = annualRevenue / 12 - opex.total / 12;
  const paybackMonths = monthlyProfit > 0 ? Math.ceil(capex.total / monthlyProfit) : 999;

  const monthlyCostPerPremise = (opex.total / 12) / Math.max(1, input.premises) + (capex.total / 60) / Math.max(1, input.premises);
  const breakEvenPremises = input.arpu > 0 ? Math.ceil((opex.total / 12 + capex.total / 60) / (input.arpu * input.adoptionRate)) : input.premises;

  const budgetUsed = totalInvestment;
  const budgetPercent = input.budget > 0 ? (budgetUsed / input.budget) * 100 : 0;
  const budgetStatus: FinancialResult["budgetStatus"] =
    budgetPercent <= 70 ? "healthy" : budgetPercent <= 90 ? "moderate" : "critical";

  const costPerPremise = input.premises > 0 ? totalInvestment / input.premises : 0;

  // Smart recommendations
  const recommendations: string[] = [];
  if (budgetPercent > 100) {
    recommendations.push("⚠️ Budget exceeded — consider switching to aerial deployment to save up to 40% on civil works.");
    if (input.deploymentType === "underground") {
      recommendations.push("💡 Hybrid deployment can reduce trenching costs by ~35% while maintaining reliability.");
    }
    recommendations.push("📊 Phase the rollout: deploy to high-density areas first to generate early revenue.");
  } else if (budgetPercent > 90) {
    recommendations.push("⚡ Budget is tight — reduce premises count or switch deployment type to create headroom.");
  }
  if (roi < 20) {
    recommendations.push("📈 Low ROI — increase ARPU or focus on dense urban zones with higher adoption rates.");
  }
  if (paybackMonths > 48) {
    recommendations.push("⏳ Payback exceeds 4 years — consider reducing scope to improve cash flow.");
  }
  if (input.adoptionRate < 0.5) {
    recommendations.push("👥 Low adoption rate — invest in marketing or offer bundled plans to boost subscriptions.");
  }
  if (recommendations.length === 0) {
    recommendations.push("✅ Configuration looks financially viable. Good balance of cost and revenue.");
  }

  return {
    capex, opex, totalInvestment, annualRevenue, fiveYearRevenue,
    profit, roi, paybackMonths, breakEvenPremises,
    budgetUsed, budgetPercent, budgetStatus, recommendations, costPerPremise,
  };
}
