import { useState, useEffect } from "react";
import { X, MapPin, Route, DollarSign, Brain, ChevronRight, HelpCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Select Source & Destination",
    description: "Choose a state, city, and colonies — or click directly on the map to set source and destination points.",
  },
  {
    icon: Route,
    title: "Choose a Route",
    description: "The system generates multiple routes (Shortest, Low Cost, Risky, Eco-Friendly). Compare them and pick the best one.",
  },
  {
    icon: DollarSign,
    title: "View Cost & Profit",
    description: "See detailed cost breakdown, materials, labour, revenue projections, and profit margins for each route.",
  },
  {
    icon: Brain,
    title: "Check AI Insights",
    description: "Get AI-powered recommendations on optimal routes, cost optimizations, and deployment strategies.",
  },
];

const STORAGE_KEY = "fttp-onboarding-seen";

const OnboardingTutorial = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!show) return null;

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[9999] bg-foreground/40 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={dismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>

        {step === 0 && (
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
              <Route className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Welcome to FTTP Planner</h2>
            <p className="text-sm text-muted-foreground mt-1">Let's walk you through the key features</p>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="text-sm font-semibold text-foreground mt-1">{current.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{current.description}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-5">
          <button onClick={dismiss} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Skip tutorial
          </button>
          <button
            onClick={() => (isLast ? dismiss() : setStep(step + 1))}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            {isLast ? "Get Started" : "Next"}
            {!isLast && <ChevronRight className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};

/** Small help button that re-triggers the tutorial */
export const HelpButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          setShow(true);
        }}
        className="fixed bottom-5 left-5 z-40 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-md"
        title="Help"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {show && <OnboardingTutorialInline onDone={() => setShow(false)} />}
    </>
  );
};

const OnboardingTutorialInline = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[9999] bg-foreground/40 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={onDone} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="text-sm font-semibold text-foreground mt-1">{current.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{current.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"}`} />
          ))}
        </div>
        <div className="flex items-center justify-end mt-5">
          <button onClick={() => (isLast ? onDone() : setStep(step + 1))} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
            {isLast ? "Done" : "Next"} {!isLast && <ChevronRight className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
