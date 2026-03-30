import { AnalyzedRoute, RouteType } from "@/lib/routeAnalyzer";
import { formatCurrency } from "@/lib/costCalculator";
import { Star, TrendingUp, ShieldCheck, Leaf, Zap } from "lucide-react";

interface Props {
  routes: AnalyzedRoute[];
  bestRoute: RouteType;
  bestReason: string;
  selectedRoute: RouteType | null;
  onSelectRoute: (type: RouteType) => void;
}

const typeIcons: Record<RouteType, React.ElementType> = {
  shortest: Zap,
  low_cost: TrendingUp,
  risky: ShieldCheck,
  eco_friendly: Leaf,
};

const RouteCards = ({ routes, bestRoute, bestReason, selectedRoute, onSelectRoute }: Props) => (
  <div className="space-y-4 animate-fade-in">
    {/* Best route recommendation */}
    <div className="glass-card-glow p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
        <Star className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">AI Recommendation</p>
        <p className="text-sm text-foreground mt-1">{bestReason}</p>
      </div>
    </div>

    {/* Route cards grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {routes.map((r) => {
        const Icon = typeIcons[r.type];
        const isBest = r.type === bestRoute;
        const isSelected = r.type === selectedRoute;
        return (
          <button
            key={r.type}
            onClick={() => onSelectRoute(r.type)}
            className={`glass-card p-4 text-left transition-all cursor-pointer relative ${
              isSelected ? "ring-2 shadow-lg" : "hover:shadow-md"
            }`}
            style={{
              borderColor: isSelected ? r.color : undefined,
              boxShadow: isSelected ? `0 0 20px -5px ${r.color}40` : undefined,
            }}
          >
            {isBest && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Star className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${r.color}20` }}>
                <Icon className="w-3.5 h-3.5" style={{ color: r.color }} />
              </div>
              <span className="text-xs font-semibold text-foreground">{r.label}</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-mono text-foreground">{r.distance_km} km</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-mono text-foreground">{formatCurrency(r.estimated_cost)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Profit (5Y)</span>
                <span className={`font-mono font-semibold ${r.estimated_profit >= 0 ? "text-success" : "text-warning"}`}>
                  {formatCurrency(Math.abs(r.estimated_profit))}
                  {r.estimated_profit < 0 ? " ⏳" : " ✓"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">ROI</span>
                <span className={`font-mono text-xs ${
                  r.estimated_profit > 0 && (r.estimated_profit / (r.estimated_profit + r.estimated_cost)) > 0.3 ? "text-success" : 
                  r.estimated_profit > 0 ? "text-primary" : "text-warning"
                }`}>
                  {r.estimated_profit > 0 && (r.estimated_profit / (r.estimated_profit + r.estimated_cost)) > 0.3 ? "High" : 
                   r.estimated_profit > 0 ? "Medium" : "Investment Phase"}
                </span>
              </div>
            </div>
            {r.estimated_profit < 0 && (
              <p className="text-[10px] text-warning/80 mt-2 italic">Initial capex phase — long-term profitability expected</p>
            )}
            <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2">{r.description}</p>
          </button>
        );
      })}
    </div>
  </div>
);

export default RouteCards;
