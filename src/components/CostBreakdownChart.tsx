import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CostBreakdown, formatCurrency } from "@/lib/costCalculator";

interface Props {
  breakdown: CostBreakdown;
}

const COLORS = ["hsl(168,72%,38%)", "hsl(210,80%,50%)", "hsl(38,92%,50%)", "hsl(280,60%,50%)"];

const CostBreakdownChart = ({ breakdown }: Props) => {
  const data = [
    { name: "Fiber", value: breakdown.fiber },
    { name: "Equipment", value: breakdown.equipment },
    { name: "Labour", value: breakdown.labour },
    { name: "Civil Works", value: breakdown.civil },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Cost Breakdown</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="value" stroke="none">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,89%)", borderRadius: "8px", color: "hsl(222,47%,11%)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} formatter={(value: number) => formatCurrency(value)} />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: "12px", color: "hsl(220,9%,46%)" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-foreground font-mono text-xs">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostBreakdownChart;
