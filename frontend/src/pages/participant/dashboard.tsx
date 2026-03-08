import { StrangeTitle } from "@/components/ui/strange-title";

export function ParticipantDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center space-y-2">
        <StrangeTitle as="h1" className="mx-auto">
          Participant Dashboard
        </StrangeTitle>
        <p className="text-muted-foreground font-mono mt-4">
          Welcome to Codeathon 4.0! Your challenges await.
        </p>
      </div>
    </div>
  );
}
