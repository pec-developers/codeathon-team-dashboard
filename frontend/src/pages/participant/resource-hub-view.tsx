import { useState, useEffect } from "react";
import { Wifi, MessageCircle, ExternalLink, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { participantApi } from "@/lib/api-participant";
import type { TeamDashboardResponse } from "@/lib/types";
import { toast } from "sonner";

export function ResourceHubView() {
  const [team, setTeam] = useState<TeamDashboardResponse | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await participantApi.getDashboard();
        setTeam(data);
      } catch (e) {
        console.error("Failed to fetch team data for Resource Hub", e);
      }
    };
    fetchTeam();
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  // You might want to get this dynamically from the backend later
  const whatsappLink = "https://chat.whatsapp.com/G9jRRVLfA4O4Vzw7rTa46W";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
         <h2 className="text-3xl font-bold tracking-tight">Resource Hub</h2>
         <p className="text-muted-foreground mt-2">Essential resources and connectivity information for your team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Event WiFi
            </CardTitle>
            <CardDescription>High-speed internet access for participating teams.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="flex flex-col gap-1 p-3 rounded-md bg-muted/30 border relative group">
                 <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Username</span>
                 <div className="flex justify-between items-center">
                   <span className="font-mono font-medium">{team?.teamId || "Loading..."}</span>
                   <Button
                     variant="white"
                     size="icon-xs"
                     className="text-muted-foreground hover:text-primary transition-colors h-fit w-fit p-1"
                     onClick={() => handleCopy(team?.teamId || "", "Username")}
                     disabled={!team?.teamId}
                   >
                     {copiedField === "Username" ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                   </Button>
                 </div>
               </div>
               <div className="flex flex-col gap-1 p-3 rounded-md bg-muted/30 border relative">
                 <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Password</span>
                 <div className="flex justify-between items-center">
                   <span className="font-mono font-medium">123456</span>
                   <Button
                     variant="white"
                     size="icon-xs"
                     className="text-muted-foreground hover:text-primary transition-colors h-fit w-fit p-1"
                     onClick={() => handleCopy("123456", "Password")}
                   >
                     {copiedField === "Password" ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                   </Button>
                 </div>
               </div>
               <p className="text-xs text-muted-foreground text-center mt-2">
                 Do not share these credentials with other teams.
               </p>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" />
              WhatsApp Community
            </CardTitle>
            <CardDescription>Join our official group for instant event updates and announcements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-80px)] space-y-4">
             <div className="p-4 rounded-full bg-green-500/10 mb-2">
                <MessageCircle className="w-8 h-8 text-green-500" />
             </div>
             <p className="text-sm text-center text-muted-foreground mb-4">
               Stay connected with organizers and other participants. Important announcements will be broadcasted here.
             </p>
             <Button 
               className="w-full bg-green-500/10 text-green-600 dark:bg-green-600 border-green-500 hover:bg-green-500/20 dark:hover:bg-green-700 dark:text-white gap-2" 
               onClick={() => window.open(whatsappLink, '_blank')}
             >
               Join WhatsApp Group <ExternalLink className="w-4 h-4" />
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
