import { useState, useMemo, useCallback } from "react";
import MapView from "@/components/MapView";
import LocationSelector from "@/components/LocationSelector";
import InputPanel from "@/components/InputPanel";
import RouteComparisonTable from "@/components/RouteComparisonTable";
import RouteCards from "@/components/RouteCards";
import SmartSuggestions from "@/components/SmartSuggestions";
import WelcomeBanner from "@/components/WelcomeBanner";
import { calculateCost, formatCurrency } from "@/lib/costCalculator";
import { generateRoutes, RouteType } from "@/lib/routeAnalyzer";
import { indianLocations } from "@/lib/locationData";

const MapPage = () => {
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
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);

  const stateData = indianLocations.find((s) => s.name === selectedState);
  const cityData = stateData?.cities.find((c) => c.name === selectedCity);

  const handleStateChange = (state: string) => { setSelectedState(state); setSelectedCity(""); setSourceColony(""); setDestColony(""); setSource(null); setDestination(null); setSelectedRoute(null); };
  const handleCityChange = (city: string) => { setSelectedCity(city); setSourceColony(""); setDestColony(""); setSource(null); setDestination(null); setSelectedRoute(null); };
  const handleSourceColonyChange = (name: string) => { setSourceColony(name); const c = cityData?.colonies.find((x) => x.name === name); if (c) setSource({ lat: c.lat, lng: c.lng }); else setSource(null); setSelectedRoute(null); };
  const handleDestColonyChange = (name: string) => { setDestColony(name); const c = cityData?.colonies.find((x) => x.name === name); if (c) setDestination({ lat: c.lat, lng: c.lng }); else setDestination(null); setSelectedRoute(null); };
  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (!source) { setSource({ lat, lng }); setSourceColony(""); }
    else if (!destination) { setDestination({ lat, lng }); setDestColony(""); }
    else { setSource(null); setDestination(null); setSourceColony(""); setDestColony(""); setSelectedRoute(null); }
  }, [source, destination]);

  const mapCenter = cityData ? { lat: cityData.lat, lng: cityData.lng } : undefined;
  const result = useMemo(() => calculateCost({ source, destination, premisesCount: premises, workers, wagePerDay, workingDays, deploymentType, arpu }), [source, destination, premises, workers, wagePerDay, workingDays, deploymentType, arpu]);

  const routeAnalysis = useMemo(() => {
    if (!source || !destination) return null;
    return generateRoutes(source, destination, premises, arpu);
  }, [source, destination, premises, arpu]);

  const handleRouteSelect = (type: RouteType) => {
    setSelectedRoute((prev) => (prev === type ? null : type));
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <WelcomeBanner />

      <div>
        <h2 className="text-xl font-bold text-foreground">Route Planning</h2>
        <p className="text-sm text-muted-foreground">Interactive fiber route planning — select colonies to generate multiple route options</p>
      </div>
      <LocationSelector selectedState={selectedState} selectedCity={selectedCity} sourceColony={sourceColony} destColony={destColony} onStateChange={handleStateChange} onCityChange={handleCityChange} onSourceColonyChange={handleSourceColonyChange} onDestColonyChange={handleDestColonyChange} />
      
      <MapView
        source={source} destination={destination} onMapClick={handleMapClick}
        center={mapCenter} zoom={12}
        routes={routeAnalysis?.routes} selectedRoute={selectedRoute} onRouteClick={handleRouteSelect}
      />

      <InputPanel source={source} destination={destination} premises={premises} onPremisesChange={setPremises} distance={result?.distance ?? null}
        workers={workers} onWorkersChange={setWorkers} wagePerDay={wagePerDay} onWageChange={setWagePerDay}
        workingDays={workingDays} onWorkingDaysChange={setWorkingDays} deploymentType={deploymentType} onDeploymentTypeChange={setDeploymentType} arpu={arpu} onArpuChange={setArpu} />

      {routeAnalysis && (
        <>
          <RouteCards
            routes={routeAnalysis.routes} bestRoute={routeAnalysis.best_route}
            bestReason={routeAnalysis.best_reason} selectedRoute={selectedRoute} onSelectRoute={handleRouteSelect}
          />
          <RouteComparisonTable
            routes={routeAnalysis.routes} bestRoute={routeAnalysis.best_route}
            onSelectRoute={handleRouteSelect} selectedRoute={selectedRoute}
          />
          <SmartSuggestions
            routes={routeAnalysis.routes}
            bestRoute={routeAnalysis.best_route}
            deploymentType={deploymentType}
          />
        </>
      )}

      {result && (
        <div className="glass-card p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Distance", value: `${result.distance.toFixed(1)} km`, color: "text-primary" },
            { label: "Total Cost", value: formatCurrency(result.totalCost), color: "text-foreground" },
            { label: "Terrain", value: `${result.terrain} (${result.terrainMultiplier}x)`, color: result.terrain === "hilly" ? "text-warning" : "text-primary" },
            { label: "Duration", value: `${result.durationDays} days`, color: "text-info" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{s.label}</p>
              <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapPage;
