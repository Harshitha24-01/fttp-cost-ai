import { useState, useMemo, useCallback } from "react";
import { MapPin, Settings, BarChart3, Brain, DollarSign, Wrench } from "lucide-react";
import MapView from "@/components/MapView";
import LocationSelector from "@/components/LocationSelector";
import InputPanel from "@/components/InputPanel";
import CostCards from "@/components/CostCards";
import CostBreakdownChart from "@/components/CostBreakdownChart";
import MaterialsTable from "@/components/MaterialsTable";
import AIInsights from "@/components/AIInsights";
import SectionHeading from "@/components/SectionHeading";
import { calculateCost } from "@/lib/costCalculator";
import { indianLocations } from "@/lib/locationData";

type SectionKey = "deployment-params" | "cost-overview" | "materials" | "cost-analysis" | "ai-insights";

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sourceColony, setSourceColony] = useState("");
  const [destColony, setDestColony] = useState("");
  const [source, setSource] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [premises, setPremises] = useState(500);
  const [workers, setWorkers] = useState(10);
  const [wagePerDay, setWagePerDay] = useState(800);
  const [workingDays, setWorkingDays] = useState(30);
  const [deploymentType, setDeploymentType] = useState<"underground" | "aerial">("underground");
  const [arpu, setArpu] = useState(500);
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);

  const stateData = indianLocations.find((s) => s.name === selectedState);
  const cityData = stateData?.cities.find((c) => c.name === selectedCity);

  const handleStateChange = (state: string) => { setSelectedState(state); setSelectedCity(""); setSourceColony(""); setDestColony(""); setSource(null); setDestination(null); };
  const handleCityChange = (city: string) => { setSelectedCity(city); setSourceColony(""); setDestColony(""); setSource(null); setDestination(null); };
  const handleSourceColonyChange = (name: string) => { setSourceColony(name); const c = cityData?.colonies.find((x) => x.name === name); if (c) setSource({ lat: c.lat, lng: c.lng }); else setSource(null); };
  const handleDestColonyChange = (name: string) => { setDestColony(name); const c = cityData?.colonies.find((x) => x.name === name); if (c) setDestination({ lat: c.lat, lng: c.lng }); else setDestination(null); };
  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (!source) { setSource({ lat, lng }); setSourceColony(""); }
    else if (!destination) { setDestination({ lat, lng }); setDestColony(""); }
    else { setSource(null); setDestination(null); setSourceColony(""); setDestColony(""); }
  }, [source, destination]);

  const mapCenter = cityData ? { lat: cityData.lat, lng: cityData.lng } : undefined;
  const result = useMemo(() => calculateCost({ source, destination, premisesCount: premises, workers, wagePerDay, workingDays, deploymentType, arpu }), [source, destination, premises, workers, wagePerDay, workingDays, deploymentType, arpu]);

  const navItems: { icon: React.ElementType; label: string; key: SectionKey }[] = [
    { icon: Settings, label: "Parameters", key: "deployment-params" },
    { icon: DollarSign, label: "Cost Overview", key: "cost-overview" },
    { icon: Wrench, label: "Materials", key: "materials" },
    { icon: BarChart3, label: "Analysis", key: "cost-analysis" },
    { icon: Brain, label: "AI Insights", key: "ai-insights" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Select locations and configure parameters to estimate FTTP costs</p>
      </div>

      <section>
        <SectionHeading icon={MapPin} title="Route Selection" subtitle="Choose state, city, and colonies for fiber route" />
        <div className="space-y-4">
          <LocationSelector selectedState={selectedState} selectedCity={selectedCity} sourceColony={sourceColony} destColony={destColony} onStateChange={handleStateChange} onCityChange={handleCityChange} onSourceColonyChange={handleSourceColonyChange} onDestColonyChange={handleDestColonyChange} />
          <MapView source={source} destination={destination} onMapClick={handleMapClick} center={mapCenter} zoom={12} />
        </div>
      </section>

      <div className="grid grid-cols-5 gap-3">
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <button key={item.key} onClick={() => setActiveSection(prev => prev === item.key ? null : item.key)}
              className={`glass-card p-3 flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${isActive ? "border-primary ring-2 ring-primary/20 shadow-md" : "hover:border-primary/30 hover:shadow-md"}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-primary/8"}`}>
                <item.icon className={`w-4 h-4 ${isActive ? "" : "text-primary"}`} />
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {activeSection === "deployment-params" && (
        <InputPanel source={source} destination={destination} premises={premises} onPremisesChange={setPremises} distance={result?.distance ?? null}
          workers={workers} onWorkersChange={setWorkers} wagePerDay={wagePerDay} onWageChange={setWagePerDay}
          workingDays={workingDays} onWorkingDaysChange={setWorkingDays} deploymentType={deploymentType} onDeploymentTypeChange={setDeploymentType} arpu={arpu} onArpuChange={setArpu} />
      )}

      {activeSection === "cost-overview" && result && <CostCards result={result} />}
      {activeSection === "materials" && result && <MaterialsTable materials={result.breakdown.materials} />}
      {activeSection === "cost-analysis" && result && <CostBreakdownChart breakdown={result.breakdown} />}
      {activeSection === "ai-insights" && result && <AIInsights result={result} premisesCount={premises} />}

      {activeSection && !result && activeSection !== "deployment-params" && (
        <p className="text-sm text-muted-foreground text-center py-8">Select source and destination on the map first.</p>
      )}
    </div>
  );
};

export default Dashboard;
