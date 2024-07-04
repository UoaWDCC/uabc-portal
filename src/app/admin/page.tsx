import { CalendarClock, CalendarDays } from "lucide-react";
import { BsPersonFillCheck } from "react-icons/bs";

import DashboardButton from "@/components/admin/DashboardButton";
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
      <div className="flex flex-col gap-4 px-4">
        <DashboardButton href="">
          <CalendarDays size={24} className="min-w-6" />
          View Sessions
        </DashboardButton>
        <DashboardButton href="admin/semesters">
          <CalendarClock size={24} className="min-w-6" />
          Edit Semester Schedules
        </DashboardButton>
        <DashboardButton href="admin/members">
          <BsPersonFillCheck size={24} className="min-w-6" /> Members
        </DashboardButton>
      </div>
    </div>
  );
}
