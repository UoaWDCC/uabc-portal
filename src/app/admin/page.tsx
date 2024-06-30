import { CalendarClock, CalendarDays } from "lucide-react";
import { BsPersonFillCheck } from "react-icons/bs";

import { DashboardButton } from "@/components/admin/DashboardButton";
import { Heading } from "@/components/Heading";

export const metadata = {
  title: "Admin Dashboard - UABC Booking Portal",
};

export default async function AdminDashboardPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex p-4">
        <Heading>Dashboard</Heading>
      </div>
      <div className="px-4 flex flex-col gap-4">
        <DashboardButton href="admin/view-sessions">
          <CalendarDays size={24} className="min-w-6" />
          View Sessions
        </DashboardButton>
        <DashboardButton href="">
          <CalendarClock size={24} className="min-w-6" />
          Edit Semester Schedules
        </DashboardButton>
        <DashboardButton href="">
          <BsPersonFillCheck size={24} className="min-w-6" /> Members
        </DashboardButton>
      </div>
    </div>
  );
}
