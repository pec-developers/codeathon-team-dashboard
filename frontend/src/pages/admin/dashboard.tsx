import { StrangeTitle } from "@/components/ui/strange-title";

export function AdminDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center space-y-2">
        <StrangeTitle as="h1" className="mx-auto">
          Admin Dashboard
        </StrangeTitle>
        <p className="text-muted-foreground font-mono mt-4">
          Manage Codeathon 4.0 users, problems, and submissions here.
        </p>
      </div>
    </div>
  );
}
