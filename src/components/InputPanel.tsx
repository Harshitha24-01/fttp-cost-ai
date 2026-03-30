import { MapPin, Navigation, Building2, Users, Banknote, Calendar, Wifi, IndianRupee, ChevronDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  source: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  premises: number;
  onPremisesChange: (v: number) => void;
  distance: number | null;
  workers: number;
  onWorkersChange: (v: number) => void;
  wagePerDay: number;
  onWageChange: (v: number) => void;
  workingDays: number;
  onWorkingDaysChange: (v: number) => void;
  deploymentType: "underground" | "aerial";
  onDeploymentTypeChange: (v: "underground" | "aerial") => void;
  arpu: number;
  onArpuChange: (v: number) => void;
}

const tooltips: Record<string, string> = {
  Premises: "Total number of homes/businesses to be connected via fiber",
  Workers: "Number of field workers assigned for deployment",
  "Wage/Day ₹": "Daily wage per worker in Indian Rupees",
  Days: "Estimated working days for project completion",
  Deploy: "Underground (trenching) costs more but is durable; Aerial (poles) is cheaper and faster",
  "ARPU ₹/mo": "Average Revenue Per User — monthly subscription income per connected premise",
};

const InputPanel = ({
  source, destination, premises, onPremisesChange, distance,
  workers, onWorkersChange, wagePerDay, onWageChange,
  workingDays, onWorkingDaysChange, deploymentType, onDeploymentTypeChange,
  arpu, onArpuChange,
}: Props) => (
  <div className="glass-card p-5 animate-fade-in space-y-4">
    <h3 className="text-sm font-semibold text-foreground">Deployment Parameters</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/60">
        <MapPin className="w-4 h-4 text-success shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Source</p>
          <p className="text-xs font-mono text-foreground truncate">
            {source ? `${source.lat.toFixed(4)}, ${source.lng.toFixed(4)}` : "Click map to set"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/60">
        <Navigation className="w-4 h-4 text-destructive shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Destination</p>
          <p className="text-xs font-mono text-foreground truncate">
            {destination ? `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}` : "Click map to set"}
          </p>
        </div>
      </div>
      {distance !== null && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/8 border border-primary/15">
          <Wifi className="w-4 h-4 text-primary shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Distance</p>
            <p className="text-sm font-bold font-mono text-primary">{distance.toFixed(2)} km</p>
          </div>
        </div>
      )}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <InputField icon={Building2} label="Premises" type="number" value={premises} onChange={(v) => onPremisesChange(Math.max(1, v))} tooltip={tooltips["Premises"]} />
      <SelectInputField icon={Users} label="Workers" value={workers} onChange={onWorkersChange} options={[5, 10, 15, 20, 25, 30, 40, 50]} tooltip={tooltips["Workers"]} />
      <InputField icon={Banknote} label="Wage/Day ₹" type="number" value={wagePerDay} onChange={(v) => onWageChange(Math.max(100, v))} tooltip={tooltips["Wage/Day ₹"]} />
      <SelectInputField icon={Calendar} label="Days" value={workingDays} onChange={onWorkingDaysChange} options={[7, 14, 21, 30, 45, 60, 90]} tooltip={tooltips["Days"]} />
      <div className="p-3 rounded-lg bg-muted/60">
        <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
          <Wifi className="w-3 h-3" /> Deploy
          <FieldTooltip text={tooltips["Deploy"]} />
        </label>
        <div className="relative">
          <select value={deploymentType} onChange={(e) => onDeploymentTypeChange(e.target.value as "underground" | "aerial")}
            className="w-full appearance-none bg-transparent text-sm font-mono text-foreground outline-none border-none p-0 cursor-pointer">
            <option value="underground">Underground</option>
            <option value="aerial">Aerial</option>
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      <InputField icon={IndianRupee} label="ARPU ₹/mo" type="number" value={arpu} onChange={(v) => onArpuChange(Math.max(50, v))} tooltip={tooltips["ARPU ₹/mo"]} />
    </div>
  </div>
);

const FieldTooltip = ({ text }: { text?: string }) => {
  if (!text) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-3 h-3 text-muted-foreground/60 cursor-help ml-auto" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[200px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
};

const InputField = ({ icon: Icon, label, value, onChange, tooltip }: { icon: any; label: string; type: string; value: number; onChange: (v: number) => void; tooltip?: string }) => (
  <div className="p-3 rounded-lg bg-muted/60">
    <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
      <Icon className="w-3 h-3" /> {label}
      <FieldTooltip text={tooltip} />
    </label>
    <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="w-full bg-transparent text-sm font-mono text-foreground outline-none border-none p-0" />
  </div>
);

const SelectInputField = ({ icon: Icon, label, value, onChange, options, tooltip }: { icon: any; label: string; value: number; onChange: (v: number) => void; options: number[]; tooltip?: string }) => (
  <div className="p-3 rounded-lg bg-muted/60">
    <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
      <Icon className="w-3 h-3" /> {label}
      <FieldTooltip text={tooltip} />
    </label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-transparent text-sm font-mono text-foreground outline-none border-none p-0 cursor-pointer">
        {options.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

export default InputPanel;
