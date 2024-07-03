import { MemberApprovalTable } from "@/components/admin/members/MemberApprovalTable";
import { NavigationBar } from "@/components/NavigationBar";

export default function AdminMembersPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavigationBar title="Members" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12 lg:py-10">
          <h1 className="text-2xl font-semibold">Approve Members</h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of members currently awaiting approval
          </p>
          <MemberApprovalTable className="grow" />
        </div>
      </div>
    </div>
  );
}
