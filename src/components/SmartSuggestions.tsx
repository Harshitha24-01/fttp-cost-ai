import { Lightbulb, ArrowRight, Shield, Leaf, TrendingDown } from "lucide-react";
import { AnalyzedRoute, RouteType } from "@/lib/routeAnalyzer";

interface SmartSuggestionsProps {
  routes: AnalyzedRoute[];
  bestRoute: RouteType;
  deploymentType: "underground" | "aerial";
}

interface Suggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  type: "cost" | "safety" | "environment";
}

const SmartSuggestions = ({ routes, bestRoute, deploymentType }: SmartSuggestionsProps) => {
  const suggestions: Suggestion[] = [];

  // Aerial vs underground suggestion
  if (deploymentType === "underground") {
    const costSaving = routes[0]?.estimated_cost ? Math.round(routes[0].estimated_cost * 0.25) : 0;
    suggestions.push({
      icon: TrendingDown,
      title: "Switch to aerial deployment",
      description: `Aerial fiber can reduce costs by ~₹${(costSaving / 100000).toFixed(1)}L. Faster installation but slightly less durable.`,
      type: "cost",
    });
  }

  // Risk avoidance
  const riskyRoute = routes.find((r) => r.risk_level === "high");
  if (riskyRoute) {
    suggestions.push({
      icon: Shield,
      title: "Avoid high-risk zones",
      description: `The ${riskyRoute.label} route passes through high-risk terrain. Consider the ${bestRoute} path for safer deployment.`,
      type: "safety",
    });
  }

  // Environmental suggestion
  const ecoRoute = routes.find((r) => r.type === "eco_friendly");
  if (ecoRoute && bestRoute !== "eco_friendly") {
    suggestions.push({
      icon: Leaf,
      title: "Consider eco-friendly route",
      description: `The eco-friendly path has ${ecoRoute.environmental_impact} environmental impact — only ${ecoRoute.distance_km} km with ₹${(ecoRoute.estimated_cost / 100000).toFixed(1)}L cost.`,
      type: "environment",
    });
  }

  // Profit-based suggestion
  const bestRouteData = routes.find((r) => r.type === bestRoute);
  if (bestRouteData && bestRouteData.estimated_profit < 0) {
    suggestions.push({
      icon: TrendingDown,
      title: "Increase subscriber coverage",
      description: `Current plan shows investment phase. Increase premises count or ARPU to achieve positive ROI within 3–5 years. Consider phased rollout to manage cash flow.`,
      type: "cost",
    });
  } else {
    suggestions.push({
      icon: Lightbulb,
      title: "Optimize premises density",
      description: "Higher subscriber density reduces per-user cost significantly. Consider expanding coverage in adjacent areas for better ROI.",
      type: "cost",
    });
  }

  const typeColors: Record<string, string> = {
    cost: "bg-primary/10 text-primary",
    safety: "bg-warning/10 text-warning",
    environment: "bg-success/10 text-success",
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Smart Suggestions</h3>
          <p className="text-[10px] text-muted-foreground">AI-powered optimization tips</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeColors[s.type]}`}>
              <s.icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">{s.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{s.description}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
