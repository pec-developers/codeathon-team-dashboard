import { useSearchParams } from "react-router-dom";
import { StrangeTitle } from "@/components/ui/strange-title";
import { TeamsView } from "./teams-view.tsx";
import { ProblemStatementsView } from "./problem-statements-view.tsx";
import { Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "problems" ? "problems" : "teams";

  return (
    <div className="flex w-full min-h-[calc(100vh-6rem)] gap-6 text-left">
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-fit min-w-64 max-w-72 shrink-0 flex-col gap-2 border-r pr-6 transition-all duration-300">
        <div className="mb-4">
          <StrangeTitle as="h2" className="text-xl text-left px-4">
            Admin
          </StrangeTitle>
        </div>
        <button
          onClick={() => setSearchParams({ tab: "teams" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "teams" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Users className="w-4 h-4 shrink-0" />
          Manage Teams
        </button>
        <button
          onClick={() => setSearchParams({ tab: "problems" })}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
            activeTab === "problems" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="w-4 h-4 shrink-0" />
          Problem Statements
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {activeTab === "teams" ? <TeamsView /> : <ProblemStatementsView />}
      </main>
    </div>
  );
}
