import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api-admin";
import type { TeamDto, Theme, Member } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TeamEditModal } from "./team-edit-modal";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";

export function TeamsView() {
  const [teams, setTeams] = useState<TeamDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const [editingTeam, setEditingTeam] = useState<TeamDto | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [teamIdToDelete, setTeamIdToDelete] = useState<string | null>(null);
  
  // Search and Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  // Register Form State
  const [newTeamId, setNewTeamId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamTheme, setNewTeamTheme] = useState<Theme>("NATIONAL_SECURITY");
  const [newMembers, setNewMembers] = useState<Member[]>([]);
  const [registering, setRegistering] = useState(false);

  const THEMES: Theme[] = [
    "NATIONAL_SECURITY", "HEALTHCARE", "EMERGENCY_MANAGEMENT", "ENVIRONMENT_AND_SUSTAINABILITY",
    "SMART_CITY", "SMART_HOME", "SMART_EDUCATION", "SECURE_DIGITAL_TRANSACTIONS_AND_LOGISTICS",
    "RURAL_DEVELOPMENT", "ZERO_HUNGER", "GOOD_HEALTH_AND_WELL_BEING", "QUALITY_EDUCATION",
    "CLEAN_WATER_AND_SANITATION", "AFFORDABLE_AND_CLEAN_ENERGY", "AQUATIC_LIFE", "CLIMATE_ACTION",
    "LIFE_ON_LAND", "ALGORITHMIC_TRADING", "LEGAL_TECH", "FINANCIAL_SERVICES"
  ];

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getAllTeams();
      setTeams(res.teams || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleRegisterTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamId || !newPassword || !newTeamName || !newTeamTheme) return;
    try {
      setRegistering(true);
      await adminApi.registerTeam({ 
        teamId: newTeamId,
        password: newPassword,
        teamName: newTeamName, 
        theme: newTeamTheme,
        members: newMembers
      });
      setIsRegisterOpen(false);
      setNewTeamId("");
      setNewPassword("");
      setNewTeamName("");
      setNewTeamTheme("NATIONAL_SECURITY");
      setNewMembers([]);
      fetchTeams();
    } catch (e) {
      console.error(e);
    } finally {
      setRegistering(false);
    }
  };

  const addMember = () => {
    setNewMembers([...newMembers, { name: "", emailId: "", year: "", department: "", college: "", mobileNumber: "" }]);
  };
  
  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...newMembers];
    updated[index] = { ...updated[index], [field]: value };
    setNewMembers(updated);
  };
  
  const removeMember = (index: number) => {
    setNewMembers(newMembers.filter((_, i) => i !== index));
  };

  const handleDeleteTeam = async () => {
    if (teamIdToDelete) {
      try {
        await adminApi.deleteTeam(teamIdToDelete);
        setTeamIdToDelete(null);
        fetchTeams();
      } catch(e) { console.error(e); }
    }
  };

  // Derived state for filtering and pagination
  const filteredTeams = teams.filter(t => 
    t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.teamId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.psId && t.psId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE) || 1;
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 if searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Manage participating teams, their members, scores, and venues.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger render={<Button font="strange" className="w-full sm:w-auto" />}>
              Register Team
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-[95vw] lg:max-w-6xl lg:w-[70vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register New Team</DialogTitle>
                <DialogDescription>
                  Create a new team for the Codeathon.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRegisterTeam} className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamId">Team ID</Label>
                    <Input 
                      id="teamId" 
                      value={newTeamId} 
                      onChange={(e) => setNewTeamId(e.target.value)} 
                      placeholder="e.g. TEAM01" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="Team Password" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input 
                      id="teamName" 
                      value={newTeamName} 
                      onChange={(e) => setNewTeamName(e.target.value)} 
                      placeholder="e.g. Code Ninjas" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select
                      id="theme"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newTeamTheme}
                      onChange={(e) => setNewTeamTheme(e.target.value as Theme)}
                      required
                    >
                      {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-semibold">Team Members</Label>
                    <Button type="button" size="sm" onClick={addMember}>+ Add Member</Button>
                  </div>
                  
                  {newMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No members added yet.</p>
                  ) : (
                    <div className="space-y-6">
                      {newMembers.map((member, i) => (
                        <div key={i} className="p-4 border rounded-md relative space-y-4">
                          <Button 
                            type="button" 
                            size="sm"
                            className="absolute right-2 top-2" 
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
                      ))}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => setIsRegisterOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={registering}>
                    {registering ? "Registering..." : "Register"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <InputGroup className="max-w-sm">
          <InputGroupText>
            <MagnifyingGlass size={16} weight="bold" />
          </InputGroupText>
          <Input 
            placeholder="Search teams by ID or name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </InputGroup>
      </div>

      <div className="hidden md:block border rounded-md overflow-x-auto w-full">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead>Team ID</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>PS ID</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No teams matched your search.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTeams.map((team) => (
                <TableRow key={team.teamId}>
                  <TableCell className="font-medium">{team.teamId}</TableCell>
                  <TableCell className="font-medium">{team.teamName}</TableCell>
                  <TableCell>{team.theme}</TableCell>
                  <TableCell>{team.psId || "N/A"}</TableCell>
                  <TableCell>{team.score}</TableCell>
                  <TableCell>{team.buildingName ? `${team.buildingName} ${team.floor} - ${team.tableNumber}` : "N/A"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={() => { setEditingTeam(team); setIsEditOpen(true); }}>Edit</Button>
                    <Button size="sm" onClick={() => setTeamIdToDelete(team.teamId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {loading ? (
          <div className="h-24 flex justify-center items-center border rounded-md text-sm text-muted-foreground">
            Loading...
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="h-24 flex justify-center items-center border rounded-md text-sm text-muted-foreground">
            No teams matched your search.
          </div>
        ) : (
          paginatedTeams.map((team) => (
            <Card key={team.teamId}>
              <CardHeader>
                <div>
                  <CardTitle className="truncate">{team.teamName}</CardTitle>
                  <CardDescription>ID: {team.teamId}</CardDescription>
                </div>
                <CardAction>
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0">
                    Score: {team.score}
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col space-y-1 text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground">Theme</span>
                    <span className="line-clamp-2">{team.theme.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground">PS ID</span>
                    <span className="line-clamp-2">{team.psId || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground">Venue</span>
                    <span>{team.buildingName ? `${team.buildingName} ${team.floor} - ${team.tableNumber}` : "N/A"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-end gap-2">
                <Button size="sm" variant="white" className="flex-1 sm:flex-none sm:w-auto" onClick={() => { setEditingTeam(team); setIsEditOpen(true); }}>Edit</Button>
                <Button size="sm" className="flex-1 sm:flex-none sm:w-auto" onClick={() => setTeamIdToDelete(team.teamId)}>Delete</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {!loading && filteredTeams.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTeams.length)}</span> of <span className="font-medium">{filteredTeams.length}</span> teams
          </p>
          <div className="flex space-x-2">
            <Button
              variant="white"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="white"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <TeamEditModal 
        team={editingTeam} 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        onSuccess={fetchTeams} 
      />

      <AlertDialog open={!!teamIdToDelete} onOpenChange={(open) => !open && setTeamIdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTeam} className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-none">
              Delete Team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
