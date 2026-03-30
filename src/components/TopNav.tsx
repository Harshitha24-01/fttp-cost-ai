import { Cable, BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface TopNavProps {
  onHelpOpen: () => void;
}

const TopNav = ({ onHelpOpen }: TopNavProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="h-14 flex items-center border-b border-border px-5 shrink-0 bg-card">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
          <Cable className="w-[18px] h-[18px] text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground tracking-tight leading-none">Agentic AI Network Build Costing Tool</h1>
        </div>
      </Link>

      {!isHome && (
        <Link
          to="/"
          className="ml-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
      )}

      <button
        onClick={onHelpOpen}
        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        Help
      </button>
    </header>
  );
};

export default TopNav;
