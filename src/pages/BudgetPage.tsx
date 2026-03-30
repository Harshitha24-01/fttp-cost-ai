import { useState, useMemo } from "react";
import { Wallet, TrendingUp, Clock, Users, Building2, Zap, Wrench, IndianRupee, Info, ChevronDown, BarChart3, Target, Lightbulb, Percent, HardHat, Cable, Landmark } from "lucide-react";
import { calculateFinancials, type BudgetInput, type DeploymentType } from "@/lib/budgetEngine";
import { formatCurrency } from "@/lib/costCalculator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const TOOLTIPS: Record<string, string> = {
  Budget: "Total investment available for the entire network deployment project",
  Premises: "Number of homes or businesses to be connected via FTTP",
  "Deploy Type": "Method of fiber installation — affects cost, speed, and reliability",
  Distance: "Estimated fiber route distance between source and destination",
  Workers: "Number of field technicians assigned for deployment",
  "Wage/Day": "Daily wage per worker in Indian Rupees (₹)",
  "Work Days": "Estimated working days for project completion",
  ARPU: "Average Revenue Per User — monthly subscription income per connected premise",
  "Adoption %": "Percentage of premises expected to subscribe to fiber service",
};

const FieldTooltip = ({ tip }: { tip: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="w-3 h-3 text-muted-foreground/60 cursor-help ml-auto shrink-0" />
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{tip}</TooltipContent>
  </Tooltip>
);

const LabelRow = ({ icon: Icon, label, tip }: { icon: any; label: string; tip?: string }) => (
  <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 font-medium">
    <Icon className="w-3 h-3" /> {label}
    {tip && <FieldTooltip tip={tip} />}
  </label>
);

const NumberInput = ({ icon, label, value, onChange, min, tip }: { icon: any; label: string; value: number; onChange: (v: number) => void; min?: number; tip?: string }) => (
  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
    <LabelRow icon={icon} label={label} tip={tip} />
    <input type="number" value={value} onChange={(e) => onChange(Math.max(min ?? 0, Number(e.target.value) || 0))}
      className="w-full bg-transparent text-sm font-mono text-foreground outline-none border-none p-0" />
  </div>
);

const SelectInput = ({ icon, label, value, onChange, options, tip }: { icon: any; label: string; value: string | number; onChange: (v: any) => void; options: { label: string; value: string | number }[]; tip?: string }) => (
  <div className="p-3 rounded-lg bg-muted/60 border border-border/50">
    <LabelRow icon={icon} label={label} tip={tip} />
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent text-sm font-mono text-foreground outline-none border-none p-0 cursor-pointer">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, sub, color = "primary" }: { icon: any; label: string; value: string; sub?: string; color?: string }) => (
  <div className={`p-4 rounded-xl bg-${color}/6 border border-${color}/15`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-4 h-4 text-${color}`} />
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
    </div>
    <p className={`text-xl font-bold font-mono text-${color}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
  </div>
);

const BreakdownRow = ({ label, value, total }: { label: string; value: number; total: number }) => {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-medium text-foreground">{formatCurrency(value)}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary/70 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const BudgetPage = () => {
  const [budget, setBudget] = useState(5000000);
  const [premises, setPremises] = useState(500);
  const [distanceKm, setDistanceKm] = useState(12);
  const [deploymentType, setDeploymentType] = useState<DeploymentType>("underground");
  const [workers, setWorkers] = useState(10);
  const [wagePerDay, setWagePerDay] = useState(800);
  const [workingDays, setWorkingDays] = useState(30);
  const [arpu, setArpu] = useState(500);
  const [adoptionRate, setAdoptionRate] = useState(70);

  const input: BudgetInput = useMemo(() => ({
    budget, premises, distanceKm, deploymentType, workers, wagePerDay, workingDays, arpu, adoptionRate: adoptionRate / 100,
  }), [budget, premises, distanceKm, deploymentType, workers, wagePerDay, workingDays, arpu, adoptionRate]);

  const result = useMemo(() => calculateFinancials(input), [input]);

  const statusColor = result.budgetStatus === "healthy" ? "success" : result.budgetStatus === "moderate" ? "warning" : "destructive";
  const statusLabel = result.budgetStatus === "healthy" ? "Within Budget" : result.budgetStatus === "moderate" ? "Budget Tight" : "Over Budget";

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" /> Budget Mode — Financial Planner</h2>
        <p className="text-sm text-muted-foreground">Enterprise-grade FTTP cost, revenue & ROI analysis</p>
      </div>

      {/* Input Parameters */}
      <div className="glass-card p-5 space-y-4 animate-fade-in">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><HardHat className="w-4 h-4 text-primary" /> Deployment Parameters</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <NumberInput icon={Landmark} label="Budget ₹" value={budget} onChange={setBudget} min={100000} tip={TOOLTIPS["Budget"]} />
          <NumberInput icon={Building2} label="Premises" value={premises} onChange={setPremises} min={1} tip={TOOLTIPS["Premises"]} />
          <NumberInput icon={Cable} label="Distance km" value={distanceKm} onChange={setDistanceKm} min={1} tip={TOOLTIPS["Distance"]} />
          <SelectInput icon={Zap} label="Deploy Type" value={deploymentType} onChange={(v: string) => setDeploymentType(v as DeploymentType)}
            options={[{ label: "Underground", value: "underground" }, { label: "Aerial", value: "aerial" }, { label: "Hybrid", value: "hybrid" }]} tip={TOOLTIPS["Deploy Type"]} />
          <NumberInput icon={Users} label="Workers" value={workers} onChange={setWorkers} min={1} tip={TOOLTIPS["Workers"]} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <NumberInput icon={IndianRupee} label="Wage/Day ₹" value={wagePerDay} onChange={setWagePerDay} min={100} tip={TOOLTIPS["Wage/Day"]} />
          <NumberInput icon={Clock} label="Work Days" value={workingDays} onChange={setWorkingDays} min={1} tip={TOOLTIPS["Work Days"]} />
          <NumberInput icon={IndianRupee} label="ARPU ₹/mo" value={arpu} onChange={setArpu} min={50} tip={TOOLTIPS["ARPU"]} />
          <NumberInput icon={Percent} label="Adoption %" value={adoptionRate} onChange={(v) => setAdoptionRate(Math.min(100, v))} min={10} tip={TOOLTIPS["Adoption %"]} />
        </div>
      </div>

      {/* Budget Utilization Bar */}
      <div className="glass-card-glow p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Budget Utilization</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-${statusColor}/15 text-${statusColor}`}>{statusLabel}</span>
            <span className="text-sm font-mono font-bold text-foreground">{formatCurrency(result.budgetUsed)} / {formatCurrency(budget)}</span>
          </div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 bg-${statusColor}`} style={{ width: `${Math.min(100, result.budgetPercent)}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{result.budgetPercent.toFixed(1)}% utilized — {result.budgetPercent <= 100 ? formatCurrency(budget - result.budgetUsed) + " remaining" : formatCurrency(result.budgetUsed - budget) + " over budget"}</p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={TrendingUp} label="ROI (5-Year)" value={`${result.roi.toFixed(1)}%`} sub={result.roi > 0 ? "Profitable" : "Investment Phase"} color={result.roi > 0 ? "success" : "warning"} />
        <MetricCard icon={Clock} label="Payback Period" value={result.paybackMonths < 999 ? `${result.paybackMonths} mo` : "N/A"} sub={result.paybackMonths <= 36 ? "Excellent" : result.paybackMonths <= 60 ? "Acceptable" : "Review needed"} color="info" />
        <MetricCard icon={Target} label="Break-even" value={`${result.breakEvenPremises} premises`} sub={`${((result.breakEvenPremises / premises) * 100).toFixed(0)}% of total`} color="primary" />
        <MetricCard icon={IndianRupee} label="Cost / Premise" value={formatCurrency(result.costPerPremise)} sub={result.costPerPremise < 15000 ? "Competitive" : "Above average"} color={result.costPerPremise < 15000 ? "success" : "warning"} />
      </div>

      {/* CAPEX & OPEX Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> CAPEX Breakdown</h3>
          <p className="text-lg font-bold font-mono text-primary">{formatCurrency(result.capex.total)}</p>
          <div className="space-y-2.5">
            <BreakdownRow label="Fiber Cable" value={result.capex.fiberCable} total={result.capex.total} />
            <BreakdownRow label="Equipment (OLT/ONT/Splitters)" value={result.capex.equipment} total={result.capex.total} />
            <BreakdownRow label="Civil Work (Trenching/Poles)" value={result.capex.civilWork} total={result.capex.total} />
            <BreakdownRow label="Installation (per premise)" value={result.capex.installation} total={result.capex.total} />
          </div>
        </div>
        <div className="glass-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Wrench className="w-4 h-4 text-warning" /> OPEX (Annual)</h3>
          <p className="text-lg font-bold font-mono text-warning">{formatCurrency(result.opex.total)}</p>
          <div className="space-y-2.5">
            <BreakdownRow label="Maintenance" value={result.opex.maintenance} total={result.opex.total} />
            <BreakdownRow label="Power" value={result.opex.power} total={result.opex.total} />
            <BreakdownRow label="Workforce Salary" value={result.opex.workforce} total={result.opex.total} />
            <BreakdownRow label="Repair & Contingency" value={result.opex.repair} total={result.opex.total} />
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><BarChart3 className="w-4 h-4 text-info" /> Financial Summary (5-Year Projection)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Investment", value: formatCurrency(result.totalInvestment) },
            { label: "Annual Revenue", value: formatCurrency(result.annualRevenue) },
            { label: "5-Year Revenue", value: formatCurrency(result.fiveYearRevenue) },
            { label: "5-Year Profit", value: formatCurrency(result.profit) },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-muted/50 border border-border/40">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{item.label}</p>
              <p className="text-sm font-bold font-mono text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Lightbulb className="w-4 h-4 text-warning" /> AI Recommendations</h3>
        <div className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/30 text-sm text-foreground">
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
