"use client";

import { MemberApprovalTable } from "@/components/admin/members/MemberApprovalTable/MemberApprovalTable";
import { SkeletonMemberApprovalTable } from "@/components/admin/members/SkeletonMemberApprovalTable";
import { NavigationBar } from "@/components/NavigationBar";
import { usePendingMembers } from "@/hooks/query/usePendingMembers";

export default function AdminMembersPage() {
  const { data, isLoading } = usePendingMembers();

  const pendingMembers = data?.map((member) => ({
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    email: member.email,
  }));

  return (
    <div className="flex min-h-dvh flex-col">
      <NavigationBar title="Members" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12 lg:py-10">
          <h1 className="text-2xl font-semibold">Approve Members</h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of members currently awaiting approval
          </p>
          {isLoading || !pendingMembers ? (
            <SkeletonMemberApprovalTable />
          ) : (
            <MemberApprovalTable data={pendingMembers} className="grow" />
          )}
        </div>
      </div>
    </div>
  );
}
