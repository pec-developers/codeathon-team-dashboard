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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProblemEditModalProps {
  problem: ProblemStatementDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ProblemEditModal({ problem, open, onOpenChange, onSuccess }: ProblemEditModalProps) {
  const [psId, setPsId] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (problem) {
      setPsId(problem.psId || "");
      setTitle(problem.psTitle || "");
      setTheme(problem.theme || "");
      setPdfUrl(problem.psPdfLink || "");
    } else {
      setPsId("");
      setTitle("");
      setTheme("");
      setPdfUrl("");
    }
  }, [problem, open]); // re-run when open changes to reset form for 'create'

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: ProblemStatementRequest = {
      ...( (!problem || psId !== problem.psId) ? { psId } : {} ),
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
            <Label>Problem Statement ID (psId)</Label>
            <Input required placeholder="e.g. PS-01" value={psId} onChange={e => setPsId(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={(val) => setTheme(val || "")} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NATIONAL_SECURITY">National Security</SelectItem>
                <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                <SelectItem value="EMERGENCY_MANAGEMENT">Emergency Management</SelectItem>
                <SelectItem value="ENVIRONMENT_AND_SUSTAINABILITY">Environment & Sustainability</SelectItem>
                <SelectItem value="SMART_CITY">Smart City</SelectItem>
                <SelectItem value="SMART_HOME">Smart Home</SelectItem>
                <SelectItem value="SMART_EDUCATION">Smart Education</SelectItem>
                <SelectItem value="SECURE_DIGITAL_TRANSACTIONS_AND_LOGISTICS">Secure Digital Transactions & Logistics</SelectItem>
                <SelectItem value="RURAL_DEVELOPMENT">Rural Development</SelectItem>
                <SelectItem value="ZERO_HUNGER">Zero Hunger</SelectItem>
                <SelectItem value="GOOD_HEALTH_AND_WELL_BEING">Good Health & Well-being</SelectItem>
                <SelectItem value="QUALITY_EDUCATION">Quality Education</SelectItem>
                <SelectItem value="CLEAN_WATER_AND_SANITATION">Clean Water & Sanitation</SelectItem>
                <SelectItem value="AFFORDABLE_AND_CLEAN_ENERGY">Affordable & Clean Energy</SelectItem>
                <SelectItem value="AQUATIC_LIFE">Aquatic Life</SelectItem>
                <SelectItem value="CLIMATE_ACTION">Climate Action</SelectItem>
                <SelectItem value="LIFE_ON_LAND">Life on Land</SelectItem>
                <SelectItem value="ALGORITHMIC_TRADING">Algorithmic Trading</SelectItem>
                <SelectItem value="LEGAL_TECH">Legal Tech</SelectItem>
                <SelectItem value="FINANCIAL_SERVICES">Financial Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>PDF Link URL</Label>
            <Input type="url" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} />
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
