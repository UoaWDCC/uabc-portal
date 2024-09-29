import { MemberApprovalTable } from "@/components/admin/members/MemberApprovalTable/MemberApprovalTable";
import { BackNavigationBar } from "@/components/BackNavigationBar";

export const metadata = {
  title: "Members - UABC Booking Portal",
};

export default function AdminMembersPage() {
  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <BackNavigationBar title="Members" pathName="/admin" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12 lg:py-10">
          <h1 className="text-2xl font-semibold">Approve Members</h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of members currently awaiting approval
          </p>
        </div>
        <div className="w-full px-0 py-4 sm:px-6 lg:w-4/5 lg:min-w-fit lg:px-12 lg:py-10">
          <MemberApprovalTable />
        </div>
      </div>
    </div>
  );
}
