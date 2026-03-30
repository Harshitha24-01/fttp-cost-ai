import { TrendingUp, DollarSign, BarChart3, Percent, Wrench, Users, HardHat, Clock, Mountain } from "lucide-react";
import { CostResult, formatCurrency } from "@/lib/costCalculator";

interface CostCardsProps {
  result: CostResult;
}

const CostCards = ({ result }: CostCardsProps) => {
  const cards = [
    { label: "Total Cost", value: formatCurrency(result.totalCost), icon: DollarSign, accent: "text-primary", bg: "bg-primary/8" },
    { label: "Material", value: formatCurrency(result.materialCost), icon: Wrench, accent: "text-chart-fiber", bg: "bg-chart-fiber/8" },
    { label: "Labour", value: formatCurrency(result.labourCost), icon: Users, accent: "text-warning", bg: "bg-warning/8" },
    { label: "Deploy Cost", value: formatCurrency(result.deploymentCost), icon: HardHat, accent: "text-chart-civil", bg: "bg-chart-civil/8" },
    { label: "Revenue (5Y)", value: formatCurrency(result.revenue), icon: TrendingUp, accent: "text-info", bg: "bg-info/8" },
    { label: "Profit", value: formatCurrency(result.profit), icon: BarChart3, accent: result.profit >= 0 ? "text-success" : "text-destructive", bg: result.profit >= 0 ? "bg-success/8" : "bg-destructive/8" },
    { label: "Margin", value: `${result.profitMargin.toFixed(1)}%`, icon: Percent, accent: result.profitMargin > 0 ? "text-success" : "text-destructive", bg: result.profitMargin > 0 ? "bg-success/8" : "bg-destructive/8" },
    { label: "Duration", value: `${result.durationDays}d`, icon: Clock, accent: "text-info", bg: "bg-info/8" },
    { label: "Terrain", value: result.terrain, icon: Mountain, accent: result.terrain === "hilly" ? "text-warning" : "text-primary", bg: result.terrain === "hilly" ? "bg-warning/8" : "bg-primary/8" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
      {cards.map((card, i) => (
        <div key={card.label} className="glass-card p-3 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider leading-tight">{card.label}</span>
            <div className={`w-6 h-6 rounded-md ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-3 h-3 ${card.accent}`} />
            </div>
          </div>
          <div className={`text-sm font-bold font-mono ${card.accent}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CostCards;
