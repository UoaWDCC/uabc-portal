import { MemberApprovalTable } from "@/components/admin/members/MemberApprovalTable/MemberApprovalTable";
import { BackNavigationBar } from "@/components/BackNavigationBar";

export const metadata = {
  title: "Member Approval - UABC Booking Portal",
};

export default function AdminMemberApprovalPage() {
  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <BackNavigationBar title="Member Approval" pathName="/admin" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12 lg:pt-10">
          <h1 className="text-2xl font-semibold">Approve Members</h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of members currently awaiting approval
          </p>
          <MemberApprovalTable />
        </div>
      </div>
    </div>
  );
}
