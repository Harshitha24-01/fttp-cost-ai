import { MaterialItem, formatCurrency } from "@/lib/costCalculator";

interface Props {
  materials: MaterialItem[];
}

const MaterialsTable = ({ materials }: Props) => {
  const total = materials.reduce((s, m) => s + m.total, 0);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Materials Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Material</th>
              <th className="text-right py-2.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Unit Cost</th>
              <th className="text-right py-2.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Qty</th>
              <th className="text-right py-2.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m) => (
              <tr key={m.name} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                <td className="py-3 text-foreground font-medium">{m.name}</td>
                <td className="py-3 text-right font-mono text-muted-foreground">{formatCurrency(m.unitCost)}/{m.unit}</td>
                <td className="py-3 text-right font-mono text-foreground">{m.quantity}</td>
                <td className="py-3 text-right font-mono text-primary font-semibold">{formatCurrency(m.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-muted/30">
              <td colSpan={3} className="py-3 text-right text-xs text-muted-foreground font-semibold uppercase">Total Material Cost</td>
              <td className="py-3 text-right font-mono text-primary font-bold">{formatCurrency(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MaterialsTable;
