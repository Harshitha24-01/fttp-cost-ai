import { ChevronDown } from "lucide-react";
import { indianLocations } from "@/lib/locationData";

interface Props {
  selectedState: string;
  selectedCity: string;
  sourceColony: string;
  destColony: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  onSourceColonyChange: (colony: string) => void;
  onDestColonyChange: (colony: string) => void;
}

const SelectField = ({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder: string;
}) => (
  <div className="relative">
    <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1.5">{label}</label>
    <div className="relative">
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-muted/60 text-sm text-foreground rounded-lg px-3 py-2.5 pr-8 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer transition-all"
      >
        <option value="" className="text-muted-foreground">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

const LocationSelector = ({ selectedState, selectedCity, sourceColony, destColony, onStateChange, onCityChange, onSourceColonyChange, onDestColonyChange }: Props) => {
  const stateData = indianLocations.find((s) => s.name === selectedState);
  const cityData = stateData?.cities.find((c) => c.name === selectedCity);

  return (
    <div className="glass-card p-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectField label="State" value={selectedState} onChange={onStateChange}
          options={indianLocations.map((s) => ({ value: s.name, label: s.name }))} placeholder="Select State" />
        <SelectField label="City" value={selectedCity} onChange={onCityChange}
          options={(stateData?.cities || []).map((c) => ({ value: c.name, label: c.name }))} placeholder="Select City" />
        <SelectField label="Source Colony" value={sourceColony} onChange={onSourceColonyChange}
          options={(cityData?.colonies || []).map((c) => ({ value: c.name, label: c.name }))} placeholder="Source" />
        <SelectField label="Destination Colony" value={destColony} onChange={onDestColonyChange}
          options={(cityData?.colonies || []).map((c) => ({ value: c.name, label: c.name }))} placeholder="Destination" />
      </div>
    </div>
  );
};

export default LocationSelector;
