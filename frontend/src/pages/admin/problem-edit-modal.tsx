import { useState, useEffect } from "react";
import type { ProblemStatementDto, ProblemStatementRequest } from "@/lib/types";
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

interface ProblemEditModalProps {
  problem: ProblemStatementDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ProblemEditModal({ problem, open, onOpenChange, onSuccess }: ProblemEditModalProps) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (problem) {
      setTitle(problem.psTitle || "");
      setTheme(problem.theme || "");
      setPdfUrl(problem.psPdfLink || "");
    } else {
      setTitle("");
      setTheme("");
      setPdfUrl("");
    }
  }, [problem, open]); // re-run when open changes to reset form for 'create'

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: ProblemStatementRequest = {
      title,
      theme,
      pdfUrl
    };

    try {
      if (problem) {
        await adminApi.updateProblemStatement(problem.psId, payload);
      } else {
        await adminApi.createProblemStatement(payload);
      }
      onSuccess();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{problem ? `Edit Problem: ${problem.psTitle}` : "Create Problem"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Input required value={theme} onChange={e => setTheme(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>PDF Link URL</Label>
            <Input type="url" required value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} />
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
