import { MemberManagementTable } from "@/components/admin/members/MemberManagementTable/MemberManagementTable";
import { BackNavigationBar } from "@/components/BackNavigationBar";

export const metadata = {
  title: "Members - UABC Booking Portal",
};

export default function AdminMembersPage() {
  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <BackNavigationBar title="Members" pathName="/admin" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12 lg:pt-10">
          <h1 className="text-2xl font-semibold">Member Management</h1>
          <MemberManagementTable />
        </div>
      </div>
    </div>
  );
}
