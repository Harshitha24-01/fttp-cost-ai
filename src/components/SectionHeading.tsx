import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const SectionHeading = ({ icon: Icon, title, subtitle }: Props) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-4.5 h-4.5 text-primary" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

export default SectionHeading;
