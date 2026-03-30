import { useState } from "react";
import { X, BookOpen, Cable, IndianRupee, MapPin, Shield, Leaf, ChevronRight } from "lucide-react";

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    icon: Cable,
    title: "What is FTTP?",
    content:
      "FTTP (Fiber to the Premises) is a broadband network architecture that delivers fiber optic cabling directly to homes or businesses. Unlike older copper-based networks, FTTP provides faster, more reliable internet with higher bandwidth capacity.",
  },
  {
    icon: MapPin,
    title: "How to Use This App",
    steps: [
      "Select a State and City from the location dropdowns",
      "Choose Source and Destination colonies, or click directly on the map",
      "Multiple routes will be generated automatically with cost and risk analysis",
      "Review the route comparison cards and table to pick the best option",
      "Adjust deployment parameters (premises, workers, wage) to refine estimates",
      "Check AI Insights for intelligent recommendations",
    ],
  },
  {
    icon: IndianRupee,
    title: "How Cost Is Calculated",
    content:
      "Total cost includes fiber cable, civil works (trenching or aerial poles), splicing, OLT/ONT equipment, labour, and permits. Terrain affects cost — urban areas have higher civil costs while highways are cheaper. Underground deployment costs more than aerial but is more durable.",
  },
  {
    icon: Shield,
    title: "Understanding Risk Levels",
    content:
      "Routes are classified by risk: Low risk means stable terrain and fewer obstacles. Medium risk involves moderate urban density or mixed terrain. High risk includes difficult terrain, flood zones, or areas requiring special permits.",
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    content:
      "Each route is assessed for environmental impact based on terrain type. Forest and wetland areas have high environmental impact and may require clearances. Urban and highway corridors typically have lower environmental restrictions.",
  },
  {
    icon: IndianRupee,
    title: "How Profit Is Calculated",
    content:
      "Profit = Total Revenue − Total Cost. Revenue is projected over 5 years using: ARPU × Premises × 12 months × 5 years. If profit appears negative, it indicates the initial investment (capex) phase — FTTP deployments typically achieve ROI within 3–5 years as subscriber base grows.",
  },
  {
    icon: Cable,
    title: "What Is ARPU?",
    content:
      "ARPU (Average Revenue Per User) is the average monthly income from each subscriber. In India, FTTP ARPU ranges from ₹300–₹800. Higher ARPU directly increases revenue and shortens the payback period. You can adjust ARPU in the input panel to see its impact on profitability.",
  },
  {
    icon: MapPin,
    title: "How Routes Affect Cost",
    content:
      "Different routes have different cost drivers. Highway corridors are cheapest (existing infrastructure). Urban areas cost more due to permits and congestion. Forest/hilly terrain adds 1.6–2.5× cost premium. Aerial deployment saves ~40% over underground but is less durable in extreme weather.",
  },
];

const HelpPanel = ({ open, onClose }: HelpPanelProps) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Help & Guide</h2>
              <p className="text-[11px] text-muted-foreground">Learn how FTTP planning works</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {sections.map((section, idx) => {
            const isOpen = expandedIdx === idx;
            return (
              <div key={idx} className={`rounded-xl border transition-all ${isOpen ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/60"}`}>
                <button
                  onClick={() => setExpandedIdx(isOpen ? null : idx)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <section.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-semibold flex-1 ${isOpen ? "text-foreground" : "text-muted-foreground"}`}>
                    {section.title}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 animate-fade-in">
                    {section.content && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                    )}
                    {"steps" in section && section.steps && (
                      <ol className="space-y-2 mt-1">
                        {section.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
