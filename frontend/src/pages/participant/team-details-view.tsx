import { useEffect, useState } from "react";
import { participantApi } from "@/lib/api-participant";
import type { TeamDashboardResponse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MapPin, Activity, BookOpen, User, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function TeamDetailsView() {
  const [team, setTeam] = useState<TeamDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [completeProfilePassword, setCompleteProfilePassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await participantApi.getDashboard();
      setTeam(data);
    } catch (e) {
      console.error(e);
      toast.error("Error fetching data", {
        description: "Could not load team details.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeProfilePassword) return;
    try {
      setIsSubmitting(true);
      await participantApi.completeProfile(completeProfilePassword);
      toast("Profile Completed", {
        description: "Your team profile and password have been updated successfully.",
      });
      fetchDashboard();
    } catch (e) {
      console.error(e);
      toast.error("Error", {
        description: "Failed to complete profile. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalizePs = async (psId: string) => {
    try {
      setIsSubmitting(true);
      await participantApi.finalizeProblemStatement(psId);
      toast("Problem Statement Finalized", {
        description: `Successfully locked in ${psId}`,
      });
      fetchDashboard();
    } catch (e) {
      console.error(e);
      toast.error("Error", {
        description: "Failed to finalize problem statement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-pulse space-y-4 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Oops!</h2>
        <p className="text-muted-foreground">Could not load team profile data.</p>
        <Button onClick={fetchDashboard} variant="default" className="mt-4">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team {team.teamName}</h2>
          <p className="text-muted-foreground mt-1 text-sm flex items-center gap-2">
            <Badge variant="outline" className="font-mono">{team.teamId}</Badge>
            <span>-</span>
            <span>{team.theme.replace(/_/g, ' ')}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {team.isProfileCompleted ? (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 gap-1 pr-3 border-green-500/20">
              <CheckCircle2 className="w-3 h-3" /> Profile Completed
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1 pr-3">
              <Activity className="w-3 h-3" /> Action Required
            </Badge>
          )}
        </div>
      </div>

      {!team.isProfileCompleted && (
         <Card className="border-red-500/50 bg-red-500/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Complete Your Profile</CardTitle>
            <CardDescription className="text-red-700/80 dark:text-red-300/80">
              Your profile setup is incomplete. To access all dashboard features and participate in the Codeathon, you must set an access password now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompleteProfile} className="flex gap-4 max-w-sm">
              <div className="space-y-2 flex-grow">
                <Input 
                  type="password" 
                  placeholder="New Team Password" 
                  value={completeProfilePassword}
                  onChange={e => setCompleteProfilePassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" variant="default" disabled={isSubmitting}>
                  Confirm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 1. Venue Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Venue Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.buildingName ? (
              <>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Building</p>
                  <p className="font-medium">{team.buildingName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Floor</p>
                    <p className="font-medium">{team.floor}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Table</p>
                    <p className="font-medium">{team.tableNumber}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Venue allocation pending.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. Problem Statement */}
      {team.isProfileCompleted && team.psReleased && !team.psFinalized && (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-5 h-5"/> Select Problem Statement
            </CardTitle>
            <CardDescription className="text-amber-700/80 dark:text-amber-300/80">
              Problem statements have been released! You must select and finalize exactly one problem statement from the options below. Note: This action is irreversible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.problemStatements?.map(ps => (
                <div key={ps.psId} className="border bg-background rounded-md p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-semibold text-base mb-1">{ps.psId}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{ps.psTitle}</p>
                  </div>
                  <div className="space-y-3">
                    <a href={ps.psPdfLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> View PDF Detals
                    </a>
                    <Button 
                      className="w-full" 
                      onClick={() => handleFinalizePs(ps.psId)}
                      variant="white"
                    >
                      Finalize {ps.psId}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" /> Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {team.members?.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-muted/30 border border-muted/50">
                <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="truncate min-w-0">
                  <p className="font-medium text-sm truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.emailId}</p>
                </div>
              </div>
            ))}
            {(!team.members || team.members.length === 0) && (
              <p className="text-sm text-muted-foreground">No members registered yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
