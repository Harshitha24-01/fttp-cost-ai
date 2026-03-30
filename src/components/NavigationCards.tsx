import { useNavigate } from "react-router-dom";
import cardRoutePlanning from "@/assets/card-route-planning.png";
import cardCostAnalysis from "@/assets/card-cost-analysis.png";
import cardScenarios from "@/assets/card-scenarios.png";
import cardBudgetMode from "@/assets/card-budget-mode.png";

const navCards = [
  {
    title: "Route Planning",
    subtitle: "Plan fiber routes",
    image: cardRoutePlanning,
    url: "/map",
    highlighted: false,
  },
  {
    title: "Cost Analysis",
    subtitle: "Analyze costs",
    image: cardCostAnalysis,
    url: "/analysis",
    highlighted: true,
  },
  {
    title: "Scenarios",
    subtitle: "Compare scenarios",
    image: cardScenarios,
    url: "/scenarios",
    highlighted: false,
  },
  {
    title: "Budget Mode",
    subtitle: "Optimize budget",
    image: cardBudgetMode,
    url: "/budget",
    highlighted: false,
  },
];

const NavigationCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2">
      {navCards.map((card, i) => (
        <button
          key={card.url}
          onClick={() => navigate(card.url)}
          className={`group animate-fade-in relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ease-out
            ${card.highlighted ? 'nav-card-highlighted' : 'nav-card'}
          `}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="px-3 pt-3 pb-4 text-center">
            <h3 className="text-lg font-semibold leading-tight bg-gradient-to-r from-foreground via-foreground/80 to-primary bg-clip-text text-transparent">{card.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default NavigationCards;
