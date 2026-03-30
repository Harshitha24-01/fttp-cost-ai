import { AnalyzedRoute, RouteType } from "@/lib/routeAnalyzer";
import { formatCurrency } from "@/lib/costCalculator";
import { Star, ShieldAlert, Leaf, Route } from "lucide-react";

interface Props {
  routes: AnalyzedRoute[];
  bestRoute: RouteType;
  onSelectRoute: (type: RouteType) => void;
  selectedRoute: RouteType | null;
}

const riskBadge = (level: string) => {
  const cls =
    level === "low"
      ? "bg-success/15 text-success"
      : level === "medium"
      ? "bg-warning/15 text-warning"
      : "bg-destructive/15 text-destructive";
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${cls}`}>{level}</span>;
};

const envBadge = (level: string) => {
  const cls =
    level === "low"
      ? "bg-primary/15 text-primary"
      : level === "medium"
      ? "bg-warning/15 text-warning"
      : "bg-destructive/15 text-destructive";
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${cls}`}>{level}</span>;
};

const RouteComparisonTable = ({ routes, bestRoute, onSelectRoute, selectedRoute }: Props) => (
  <div className="glass-card p-5 animate-fade-in">
    <div className="flex items-center gap-2 mb-4">
      <Route className="w-4 h-4 text-primary" />
      <h3 className="text-sm font-semibold text-foreground">Route Comparison</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Route", "Distance", "Cost", "Profit", "Risk", "Environment", ""].map((h) => (
              <th key={h} className="text-left py-2.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => {
            const isBest = r.type === bestRoute;
            const isSelected = r.type === selectedRoute;
            return (
              <tr
                key={r.type}
                onClick={() => onSelectRoute(r.type)}
                className={`border-b border-border/50 cursor-pointer transition-colors ${
                  isSelected ? "bg-primary/8" : "hover:bg-muted/40"
                } ${isBest ? "ring-1 ring-primary/20" : ""}`}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                    <span className="font-medium text-foreground">{r.label}</span>
                    {isBest && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        <Star className="w-2.5 h-2.5" /> Best
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 font-mono text-foreground">{r.distance_km} km</td>
                <td className="py-3 px-2 font-mono text-foreground">{formatCurrency(r.estimated_cost)}</td>
                <td className={`py-3 px-2 font-mono font-semibold ${r.estimated_profit >= 0 ? "text-success" : "text-destructive"}`}>
                  {formatCurrency(r.estimated_profit)}
                </td>
                <td className="py-3 px-2">{riskBadge(r.risk_level)}</td>
                <td className="py-3 px-2">{envBadge(r.environmental_impact)}</td>
                <td className="py-3 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoute(r.type);
                    }}
                    className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {isSelected ? "Selected" : "View"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default RouteComparisonTable;
