const legendItems = [
  { color: "#22c55e", label: "Shortest Path" },
  { color: "#3b82f6", label: "Low Cost Path" },
  { color: "#ef4444", label: "Risky Path" },
  { color: "#14b8a6", label: "Eco-Friendly Path" },
];

const MapLegend = () => (
  <div className="absolute bottom-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg">
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Route Types</p>
    <div className="space-y-1.5">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-[11px] text-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default MapLegend;
