import { useSearchParams } from "react-router-dom";
import { StrangeTitle } from "@/components/ui/strange-title";
import { TeamDetailsView } from "./team-details-view.tsx";
import { EventDetailsView } from "./event-details-view.tsx";
import { LeaderboardView } from "./leaderboard-view.tsx";
import { ContactView } from "./contact-view.tsx";
import { Users, Info, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

export function ParticipantDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "team-details";

  const renderContent = () => {
    switch (activeTab) {
      case "team-details": return <TeamDetailsView />;
      case "event-details": return <EventDetailsView />;
      case "leaderboard": return <LeaderboardView />;
      case "contact": return <ContactView />;
      default: return <TeamDetailsView />;
    }
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-6rem)] gap-6 text-left">
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-fit min-w-64 max-w-72 shrink-0 flex-col gap-2 border-r pr-6 transition-all duration-300">
        <div className="mb-4">
          <StrangeTitle as="h2" className="text-xl text-left px-4">
            Dashboard
          </StrangeTitle>
        </div>
        
        <button
          onClick={() => setSearchParams({ tab: "team-details" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "team-details" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Users className="w-4 h-4 shrink-0" />
          Team Details
        </button>
        
        <button
          onClick={() => setSearchParams({ tab: "event-details" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "event-details" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Info className="w-4 h-4 shrink-0" />
          Event Details
        </button>

        {/* <button
          onClick={() => setSearchParams({ tab: "leaderboard" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "leaderboard" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Trophy className="w-4 h-4 shrink-0" />
          Leaderboard
        </button> */}

        <button
          onClick={() => setSearchParams({ tab: "contact" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "contact" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Headset className="w-4 h-4 shrink-0" />
          Contact
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {renderContent()}
      </main>
    </div>
  );
}
