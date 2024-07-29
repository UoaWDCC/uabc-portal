import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PendingApprovalAlert() {
  return (
    <Alert className="bg-primary text-primary-foreground">
      <AlertTitle>Account Pending Approval</AlertTitle>
      <AlertDescription>
        Your account is pending approval. You will be able to book sessions once
        approved
      </AlertDescription>
    </Alert>
  );
}
