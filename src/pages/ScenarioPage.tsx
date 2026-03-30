import { useState, useMemo } from "react";
import { GitCompare } from "lucide-react";
import { calculateCost, formatCurrency } from "@/lib/costCalculator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import SectionHeading from "@/components/SectionHeading";

const ScenarioPage = () => {
  const [distance, setDistance] = useState(50);
  const [premises, setPremises] = useState(500);
  const [workersA, setWorkersA] = useState(10);
  const [workersB, setWorkersB] = useState(25);

  const baseCoords = { lat: 19.076, lng: 72.8777 };
  const destCoords = { lat: 19.076 + distance * 0.009, lng: 72.8777 + distance * 0.009 };

  const scenarios = useMemo(() => {
    const underground10 = calculateCost({ source: baseCoords, destination: destCoords, premisesCount: premises, workers: workersA, wagePerDay: 800, workingDays: 30, deploymentType: "underground", arpu: 500 });
    const aerial10 = calculateCost({ source: baseCoords, destination: destCoords, premisesCount: premises, workers: workersA, wagePerDay: 800, workingDays: 30, deploymentType: "aerial", arpu: 500 });
    const underground25 = calculateCost({ source: baseCoords, destination: destCoords, premisesCount: premises, workers: workersB, wagePerDay: 800, workingDays: 30, deploymentType: "underground", arpu: 500 });
    const aerial25 = calculateCost({ source: baseCoords, destination: destCoords, premisesCount: premises, workers: workersB, wagePerDay: 800, workingDays: 30, deploymentType: "aerial", arpu: 500 });
    return [
      { name: `UG / ${workersA}W`, ...underground10 },
      { name: `Aerial / ${workersA}W`, ...aerial10 },
      { name: `UG / ${workersB}W`, ...underground25 },
      { name: `Aerial / ${workersB}W`, ...aerial25 },
    ].filter(s => s.totalCost !== undefined);
  }, [distance, premises, workersA, workersB]);

  const chartData = scenarios.map(s => ({
    name: s.name,
    "Total Cost": s.totalCost,
    "Revenue": s.revenue,
    "Profit": s.profit,
  }));

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground">Scenario Comparison</h2>
        <p className="text-sm text-muted-foreground">Compare deployment strategies side-by-side</p>
      </div>

      <div className="glass-card p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Distance: <span className="text-foreground font-mono font-bold">{distance} km</span></label>
          <input type="range" min={5} max={300} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Premises: <span className="text-foreground font-mono font-bold">{premises}</span></label>
          <input type="range" min={50} max={5000} value={premises} onChange={(e) => setPremises(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Team A: <span className="text-foreground font-mono font-bold">{workersA} workers</span></label>
          <input type="range" min={5} max={50} value={workersA} onChange={(e) => setWorkersA(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Team B: <span className="text-foreground font-mono font-bold">{workersB} workers</span></label>
          <input type="range" min={5} max={50} value={workersB} onChange={(e) => setWorkersB(Number(e.target.value))} className="w-full accent-primary" />
        </div>
      </div>

      <div className="glass-card p-6 overflow-x-auto">
        <SectionHeading icon={GitCompare} title="Side-by-Side Comparison" subtitle="Key metrics across all scenarios" />
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Metric</th>
              {scenarios.map(s => <th key={s.name} className="text-right py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{s.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Total Cost", key: "totalCost" as const },
              { label: "Material Cost", key: "materialCost" as const },
              { label: "Labour Cost", key: "labourCost" as const },
              { label: "Deploy Cost", key: "deploymentCost" as const },
              { label: "Revenue (5Y)", key: "revenue" as const },
              { label: "Profit", key: "profit" as const },
              { label: "Margin", key: "profitMargin" as const },
              { label: "Duration", key: "durationDays" as const },
            ].map(row => (
              <tr key={row.label} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                <td className="py-2.5 text-foreground font-medium">{row.label}</td>
                {scenarios.map(s => (
                  <td key={s.name} className="py-2.5 text-right font-mono text-sm">
                    <span className={row.key === "profit" ? (((s as any)[row.key] || 0) >= 0 ? "text-success" : "text-destructive") : "text-foreground"}>
                      {row.key === "profitMargin" ? `${((s as any)[row.key] || 0).toFixed(1)}%` : row.key === "durationDays" ? `${(s as any)[row.key] || 0}d` : formatCurrency((s as any)[row.key] || 0)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Cost vs Revenue vs Profit</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,89%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220,9%,46%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,89%)", borderRadius: "8px", color: "hsl(222,47%,11%)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(220,9%,46%)" }} />
              <Bar dataKey="Total Cost" fill="hsl(0,72%,51%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Revenue" fill="hsl(210,80%,50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Profit" fill="hsl(142,70%,40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
