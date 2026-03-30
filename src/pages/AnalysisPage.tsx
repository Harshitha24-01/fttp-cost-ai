import { useState, useMemo } from "react";
import CostCards from "@/components/CostCards";
import CostBreakdownChart from "@/components/CostBreakdownChart";
import AIInsights from "@/components/AIInsights";
import { calculateCost } from "@/lib/costCalculator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const AnalysisPage = () => {
  const [premises, setPremises] = useState(100);
  const [distance, setDistance] = useState(50);

  const result = useMemo(() => calculateCost({
    source: { lat: 19.076, lng: 72.8777 },
    destination: { lat: 19.076 + distance * 0.009, lng: 72.8777 + distance * 0.009 },
    premisesCount: premises, workers: 10, wagePerDay: 800, workingDays: 30, deploymentType: "underground", arpu: 500,
  }), [premises, distance]);

  const barData = result ? [
    { name: "Fiber", cost: result.breakdown.fiber, fill: "hsl(168,72%,38%)" },
    { name: "Equipment", cost: result.breakdown.equipment, fill: "hsl(210,80%,50%)" },
    { name: "Labour", cost: result.breakdown.labour, fill: "hsl(38,92%,50%)" },
    { name: "Civil", cost: result.breakdown.civil, fill: "hsl(280,60%,50%)" },
  ] : [];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground">Cost Analysis</h2>
        <p className="text-sm text-muted-foreground">Simulate costs by adjusting distance and premises</p>
      </div>

      <div className="glass-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
            Distance (km): <span className="text-foreground font-mono font-bold">{distance}</span>
          </label>
          <input type="range" min={1} max={500} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
            Premises: <span className="text-foreground font-mono font-bold">{premises}</span>
          </label>
          <input type="range" min={1} max={5000} value={premises} onChange={(e) => setPremises(Number(e.target.value))} className="w-full accent-primary" />
        </div>
      </div>

      {result && (
        <>
          <CostCards result={result} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CostBreakdownChart breakdown={result.breakdown} />
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Cost Comparison</h3>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,89%)" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,89%)", borderRadius: "8px", color: "hsl(222,47%,11%)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                    <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <AIInsights result={result} premisesCount={premises} />
        </>
      )}
    </div>
  );
};

export default AnalysisPage;
