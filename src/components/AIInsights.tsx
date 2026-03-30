import { Lightbulb, AlertTriangle, MessageSquare, Shield, Clock, Users } from "lucide-react";
import { CostResult } from "@/lib/costCalculator";

interface Props {
  result: CostResult;
  premisesCount: number;
}

const AIInsights = ({ result, premisesCount }: Props) => {
  const riskLevel = result.profitMargin < 0 ? "high" : result.profitMargin < 15 ? "medium" : "low";
  const riskColor = riskLevel === "high" ? "text-destructive" : riskLevel === "medium" ? "text-warning" : "text-success";
  const riskBg = riskLevel === "high" ? "bg-destructive/8" : riskLevel === "medium" ? "bg-warning/8" : "bg-success/8";
  const roiMonths = result.profit > 0 ? Math.ceil(result.totalCost / (result.revenue / 60)) : 0;
  const wo = result.workforceOptimization;

  return (
    <div className="glass-card p-6 animate-fade-in space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse glow-dot" />
        <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
      </div>

      {result.riskFlags.length > 0 && (
        <div className="space-y-2">
          {result.riskFlags.map((flag, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-destructive/6 border border-destructive/15">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <p className="text-xs text-foreground/70">{flag}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 p-3 rounded-lg bg-info/6 border border-info/15">
        <MessageSquare className="w-4 h-4 text-info mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-info mb-1">Analysis</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{result.explanation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={`flex items-center gap-2 p-3 rounded-lg ${riskBg}`}>
          <Shield className={`w-4 h-4 ${riskColor} shrink-0`} />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk Level</p>
            <p className={`text-sm font-semibold capitalize ${riskColor}`}>{riskLevel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/6">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. ROI</p>
            <p className="text-sm font-semibold text-foreground">{roiMonths > 0 ? `${roiMonths} months` : "N/A"}</p>
          </div>
        </div>
      </div>

      {wo.savingsPercent > 1 && (
        <div className="flex gap-3 p-3 rounded-lg bg-primary/6 border border-primary/15">
          <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">Workforce Optimization</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Using {wo.optimalWorkers} workers instead of the current count reduces cost by {wo.savingsPercent.toFixed(0)}%{wo.additionalDays > 0 ? ` with ${wo.additionalDays} additional days` : ""}.
            </p>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-warning" />
          <p className="text-xs font-semibold text-warning">Optimization Suggestions</p>
        </div>
        <div className="space-y-2">
          {result.optimizations.map((opt, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-primary font-mono shrink-0">{String(i + 1).padStart(2, "0")}.</span>
              <span className="leading-relaxed">{opt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
