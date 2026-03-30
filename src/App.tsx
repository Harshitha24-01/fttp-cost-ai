import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import AnalysisPage from "./pages/AnalysisPage";
import ScenarioPage from "./pages/ScenarioPage";
import BudgetPage from "./pages/BudgetPage";
import NotFound from "./pages/NotFound";
import AIChatBot from "./components/AIChatBot";
import OnboardingTutorial from "./components/OnboardingTutorial";
import { HelpButton } from "./components/OnboardingTutorial";
import HelpPanel from "./components/HelpPanel";
import TopNav from "./components/TopNav";

const queryClient = new QueryClient();

const AppContent = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <TopNav onHelpOpen={() => setHelpOpen(true)} />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/scenarios" element={<ScenarioPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AIChatBot />
      <OnboardingTutorial />
      <HelpButton />
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
