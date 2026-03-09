import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api-admin";
import type { ProblemStatementDto } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { ProblemEditModal } from "./problem-edit-modal";

export function ProblemStatementsView() {
  const [problems, setProblems] = useState<ProblemStatementDto[]>([]);
  const [isReleased, setIsReleased] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editingProblem, setEditingProblem] = useState<ProblemStatementDto | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getAllProblemStatements();
      setProblems(res.problemStatements || []);
      // setIsReleased is not available in res, so we rely on its last toggled state or another source
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleToggleRelease = async (checked: boolean) => {
    try {
      await adminApi.releaseProblemStatements(checked);
      setIsReleased(checked);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProblems = problems.filter(ps => 
    ps.psId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ps.psTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ps.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE) || 1;
  const paginatedProblems = filteredProblems.slice(
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
          <h2 className="text-2xl font-bold tracking-tight">Problem Statements</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Manage problem statements released to participants.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Release to Participants</span>
            <Switch checked={isReleased} onCheckedChange={handleToggleRelease} />
          </div>
          <Button className="w-full sm:w-auto" onClick={() => { setEditingProblem(null); setIsEditOpen(true); }}>Create Problem</Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <InputGroup className="max-w-sm">
          <InputGroupText>
            <MagnifyingGlass size={16} weight="bold" />
          </InputGroupText>
          <Input 
            placeholder="Search by ID, title or theme..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {loading ? (
          <div className="h-24 flex items-center justify-center border rounded-md">
            Loading...
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="h-24 flex items-center justify-center border rounded-md">
            No problem statements matched your search.
          </div>
        ) : (
          paginatedProblems.map((ps) => (
            <Card key={ps.psId}>
              <CardHeader>
                <CardTitle className="line-clamp-2" title={ps.psTitle}>
                  <span className="text-muted-foreground font-mono text-sm mr-2">[{ps.psId}]</span>
                  {ps.psTitle}
                </CardTitle>
                <CardAction className="space-x-2">
                  <Button size="sm" variant="white" onClick={() => { setEditingProblem(ps); setIsEditOpen(true); }}>Edit</Button>
                  <Button size="sm" onClick={async () => {
                    await adminApi.deleteProblemStatement(ps.psId);
                    fetchProblems();
                  }}>Delete</Button>
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Theme:</span>
                  <span>{ps.theme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">PDF:</span>
                  {ps.psPdfLink && ps.psPdfLink.trim() !== "" ? (
                    <a href={ps.psPdfLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      View PDF
                    </a>
                  ) : (
                    <span className="text-muted-foreground italic text-sm border px-2 py-0.5 rounded bg-muted/50">N/A</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="hidden md:block border rounded-md overflow-x-auto w-full">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>PDF Link</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredProblems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No problem statements matched your search.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProblems.map((ps) => (
                <TableRow key={ps.psId}>
                  <TableCell className="font-mono text-sm text-muted-foreground">{ps.psId}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate" title={ps.psTitle}>{ps.psTitle}</TableCell>
                  <TableCell>{ps.theme}</TableCell>
                  <TableCell>
                    {ps.psPdfLink && ps.psPdfLink.trim() !== "" ? (
                      <a href={ps.psPdfLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        View PDF
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic text-sm border px-2 py-0.5 rounded bg-muted/50">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={() => { setEditingProblem(ps); setIsEditOpen(true); }}>Edit</Button>
                    <Button size="sm" onClick={async () => {
                      await adminApi.deleteProblemStatement(ps.psId);
                      fetchProblems();
                    }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && filteredProblems.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProblems.length)}</span> of <span className="font-medium">{filteredProblems.length}</span> problems
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

      <ProblemEditModal 
        problem={editingProblem} 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        onSuccess={fetchProblems} 
      />
    </div>
  );
}
