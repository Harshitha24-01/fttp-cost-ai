import { useState } from "react";
import { Cable, X, Sparkles } from "lucide-react";

const DISMISSED_KEY = "fttp_welcome_dismissed";

const WelcomeBanner = () => {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === "true");

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
            <Cable className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              Welcome to FTTP Planner
              <Sparkles className="w-4 h-4 text-primary" />
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-xl">
              Plan your FTTP network efficiently with AI-powered multi-route analysis, real-time cost estimation, and business intelligence. 
              Select a state, city, and two colonies to generate optimized deployment plans instantly.
            </p>
          </div>
        </div>
        <button onClick={handleDismiss} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center shrink-0 transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
    </div>
  );
};

export default WelcomeBanner;
