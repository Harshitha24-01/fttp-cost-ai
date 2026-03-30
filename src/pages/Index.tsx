import NavigationCards from "@/components/NavigationCards";

const Index = () => {
  return (
    <div className="topo-bg min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 py-8 md:py-0">
      <div className="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-8">
        {/* Welcome heading */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-bold text-foreground tracking-tight leading-tight">
            Welcome to the Agentic AI Network Build Costing Tool
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a module below to get started with fiber network planning, cost analysis,
            {" "}scenario comparison, or budget optimization.
          </p>
        </div>

        {/* Navigation cards */}
        <NavigationCards />
      </div>
    </div>
  );
};

export default Index;
