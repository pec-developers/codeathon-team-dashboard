import { useEffect, useState } from "react";
import { participantApi } from "@/lib/api-participant";
import type { LeaderBoardResponse } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Star } from "lucide-react";
import { toast } from "sonner";

export function LeaderboardView() {
  const [data, setData] = useState<LeaderBoardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await participantApi.getLeaderboard(20); // Top 20 for more engaged view
      setData(res);
    } catch (e) {
      console.error(e);
      toast.error("Error fetching leaderboard", {
        description: "Could not load the latest standings.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-slate-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-700" />;
      default: return <span className="font-bold text-muted-foreground w-5 text-center">{index + 1}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-pulse space-y-4 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-3 pb-4">
         <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
           <Trophy className="w-8 h-8 text-primary" />
         </div>
         <h2 className="text-3xl font-bold tracking-tight">Codeathon Leaderboard</h2>
         <p className="text-muted-foreground">Top performing teams based on current evaluation scores.</p>
      </div>

      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-muted/30 border-b pb-4">
           <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                 <Star className="w-5 h-5 text-primary" /> Live Standings
              </CardTitle>
              <CardDescription>
                 Auto-refreshes periodically
              </CardDescription>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          {!data?.teams || data.teams.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No scores have been published yet. Check back later!
            </div>
          ) : (
            <div className="divide-y">
              {data.teams.map((team, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-muted/50 ${index < 3 ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${index < 3 ? 'text-lg' : 'text-base'}`}>
                        {team.teamName}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Points</span>
                    <span className={`font-mono font-bold ${index < 3 ? 'text-xl text-primary' : 'text-lg'}`}>
                      {team.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
