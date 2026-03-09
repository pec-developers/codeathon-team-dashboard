import { useState, useEffect } from "react";
import type { TeamDto, Member, Theme, ProblemStatementDto } from "@/lib/types";
import { adminApi } from "@/lib/api-admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditMode = "none" | "venue" | "score" | "members" | "theme" | "password" | "problem-statement";

interface TeamEditModalProps {
  team: TeamDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const THEMES: Theme[] = [
  "NATIONAL_SECURITY", "HEALTHCARE", "EMERGENCY_MANAGEMENT", "ENVIRONMENT_AND_SUSTAINABILITY",
  "SMART_CITY", "SMART_HOME", "SMART_EDUCATION", "SECURE_DIGITAL_TRANSACTIONS_AND_LOGISTICS",
  "RURAL_DEVELOPMENT", "ZERO_HUNGER", "GOOD_HEALTH_AND_WELL_BEING", "QUALITY_EDUCATION",
  "CLEAN_WATER_AND_SANITATION", "AFFORDABLE_AND_CLEAN_ENERGY", "AQUATIC_LIFE", "CLIMATE_ACTION",
  "LIFE_ON_LAND", "ALGORITHMIC_TRADING", "LEGAL_TECH", "FINANCIAL_SERVICES"
];

export function TeamEditModal({ team, open, onOpenChange, onSuccess }: TeamEditModalProps) {
  const [mode, setMode] = useState<EditMode>("none");
  const [loading, setLoading] = useState(false);

  // Form states
  const [buildingName, setBuildingName] = useState("");
  const [floor, setFloor] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState<Theme>("NATIONAL_SECURITY");
  const [members, setMembers] = useState<Member[]>([]);
  const [psId, setPsId] = useState("");
  const [problemStatements, setProblemStatements] = useState<ProblemStatementDto[]>([]);

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (team) {
      setBuildingName(team?.buildingName || "");
      setFloor(team?.floor || "");
      setTableNumber(team?.tableNumber || "");
      setScore(team?.score || 0);
      setTheme((team?.theme as Theme) || "NATIONAL_SECURITY");
      setMembers(team?.members || []);
      setPsId(team?.psId || "");
      setMode("none");
    }
  }, [team, open]);

  useEffect(() => {
    if (open) {
      const fetchPS = async () => {
        try {
          const res = await adminApi.getAllProblemStatements();
          setProblemStatements(res.problemStatements);
        } catch (e) {
          console.error("Failed to fetch problem statements", e);
        }
      };
      fetchPS();
    }
  }, [open]);

  if (!team) return null;

  const handleResetPassword = async () => {
    if (!newPassword) return;
    setLoading(true);
    try {
      await adminApi.resetTeamPassword(team.teamId, { newPassword });
      alert("Password reset successfully.");
      setNewPassword("");
      setMode("none");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVenue = async () => {
    setLoading(true);
    try {
      await adminApi.updateTeamVenue(team.teamId, { buildingName, floor, tableNumber });
      onSuccess();
      setMode("none");
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSaveScore = async () => {
    setLoading(true);
    try {
      await adminApi.updateTeamScore(team.teamId, { score });
      onSuccess();
      setMode("none");
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSaveTheme = async () => {
    setLoading(true);
    try {
      await adminApi.updateTeamTheme(team.teamId, { theme });
      onSuccess();
      setMode("none");
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSaveMembers = async () => {
    setLoading(true);
    try {
      await adminApi.updateTeamMembers(team.teamId, { members });
      onSuccess();
      setMode("none");
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSaveProblemStatement = async () => {
    setLoading(true);
    try {
      await adminApi.updateTeamProblemStatement(team.teamId, { psId });
      onSuccess();
      setMode("none");
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const addMember = () => {
    setMembers([...members, { name: "", emailId: "", year: "", department: "", college: "", mobileNumber: "" }]);
  };
  
  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };
  
  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const renderContent = () => {
    switch (mode) {
      case "none":
        return (
          <div className="flex flex-wrap gap-4 py-4">
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("venue")}>
              Venue
            </Button>
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("score")}>
              Score
            </Button>
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("members")}>
              Members
            </Button>
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("theme")}>
              Theme
            </Button>
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("password")}>
              Password
            </Button>
            <Button variant="white" className="h-20 flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2" onClick={() => setMode("problem-statement")}>
              Problem Statement
            </Button>
            <div className="w-full mt-4 pt-4 border-t flex justify-end">
              <Button variant="white" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        );

      case "venue":
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Building Name</Label>
              <Input value={buildingName} onChange={e => setBuildingName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Floor</Label>
              <Input value={floor} onChange={e => setFloor(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Table Number</Label>
              <Input value={tableNumber} onChange={e => setTableNumber(e.target.value)} />
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button onClick={handleSaveVenue} disabled={loading}>Save Venue</Button>
            </div>
          </div>
        );

      case "score":
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Score</Label>
              <Input type="number" value={score} onChange={e => setScore(Number(e.target.value))} />
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button onClick={handleSaveScore} disabled={loading}>Save Score</Button>
            </div>
          </div>
        );

      case "theme":
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
              >
                {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button onClick={handleSaveTheme} disabled={loading}>Save Theme</Button>
            </div>
          </div>
        );

      case "members":
        return (
          <div className="space-y-2 py-4">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base font-semibold">Team Members</Label>
              <Button type="button" size="sm" onClick={addMember}>+ Add Member</Button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
              {members.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No members currently.</p>
              ) : (
                members.map((member, i) => (
                  <div key={i} className="p-4 border rounded-md relative space-y-4">
                    <Button 
                      type="button" 
                      size="sm"
                      className="absolute right-2 top-2 text-red-500 border-red-500 hover:bg-red-500/15" 
                      onClick={() => removeMember(i)}
                    >
                      X
                    </Button>
                    <Label className="font-semibold text-sm block">Member {i + 1}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Name" value={member.name} onChange={(e) => updateMember(i, "name", e.target.value)} required />
                      <Input placeholder="Email" type="email" value={member.emailId} onChange={(e) => updateMember(i, "emailId", e.target.value)} required />
                      <Input placeholder="Mobile Number" value={member.mobileNumber} onChange={(e) => updateMember(i, "mobileNumber", e.target.value)} required />
                      <Input placeholder="College" value={member.college} onChange={(e) => updateMember(i, "college", e.target.value)} required />
                      <Input placeholder="Department" value={member.department} onChange={(e) => updateMember(i, "department", e.target.value)} required />
                      <Input placeholder="Year" value={member.year} onChange={(e) => updateMember(i, "year", e.target.value)} required />
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pt-4 flex justify-end space-x-2 border-t">
              <Button variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button onClick={handleSaveMembers} disabled={loading}>Save Members</Button>
            </div>
          </div>
        );

      case "password":
        return (
          <form 
            onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button type="button" variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button type="submit" disabled={loading || !newPassword}>Reset Password</Button>
            </div>
          </form>
        );

      case "problem-statement":
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Problem Statement</Label>
              {problemStatements.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No problem statements available. Please create them first.</p>
              ) : (
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={psId}
                  onChange={(e) => setPsId(e.target.value)}
                >
                  <option value="">-- Select Problem Statement --</option>
                  {problemStatements.map(ps => (
                    <option key={ps.psId} value={ps.psId}>
                      [{ps.psId}] {ps.psTitle} ({ps.theme})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="white" onClick={() => setMode("none")}>Back</Button>
              <Button onClick={handleSaveProblemStatement} disabled={loading || !psId}>Save Problem Statement</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) setMode("none");
      onOpenChange(val);
    }}>
      <DialogContent className={mode === "members" ? "max-w-[95vw] w-[95vw] lg:max-w-4xl lg:w-[60vw]" : ""}>
        <DialogHeader>
          <DialogTitle>
            {mode === "none" ? `Edit Team: ${team.teamName}` : `Edit ${mode.charAt(0).toUpperCase() + mode.slice(1)} - ${team.teamName}`}
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
