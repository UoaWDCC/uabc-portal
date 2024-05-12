import Link from "next/link";

import { Heading } from "@/components/Heading";
import { ArrowRight } from "@/components/Icons";

export default async function AdminDashboardPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex p-4">
        <Heading>Dashboard</Heading>
      </div>
      <div className="px-4">
        <Link href="/admin/edit-schedule">
          <div className="relative h-20 bg-primary text-primary-foreground pl-6 flex items-center text-lg font-medium rounded-sm">
            Edit Session Schedule
            <ArrowRight className="absolute right-4 bottom-6 fill-primary-foreground" />
          </div>
        </Link>

        <div className="mt-4 relative h-20 bg-primary text-primary-foreground pl-6 flex items-center text-lg font-medium rounded-sm">
          <Link href="/admin/session-schedule">View Sessions</Link>
          <ArrowRight className="absolute right-4 bottom-6 fill-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
