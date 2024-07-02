import { useState } from "react";
import { format, isToday, parse } from "date-fns";

import { AdminViewSessionCard } from "@/components/admin/view-sessions/AdminViewSessionCard";
import { EmptyAdminViewSessionCard } from "@/components/admin/view-sessions/EmptyAdminViewSessionCard";
import { GameSessionProvider } from "@/components/admin/view-sessions/GameSessionContext";
import { SkeletonViewSessionCard } from "@/components/admin/view-sessions/SkeletonViewSessionCard";
import { formatTitle } from "@/components/admin/view-sessions/utils";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useGameSession } from "@/hooks/query/useGameSession";
import { cn, convertTo12HourFormat } from "@/lib/utils";

export default function ClientViewSessionsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const { data, isLoading } = useGameSession(format(date, "yyyy-MM-dd"));

  function getSessionState(date: Date) {
    const now = new Date();
    if (date < now) {
      return "past";
    }
    if (date > now) {
      return "upcoming";
    }
    return "ongoing";
  }

  const datesWithSessions: Date[] = [
    new Date("2024-06-05"),
    new Date("2024-06-18"),
    new Date("2024-06-26"),
    new Date("2024-06-28"),
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 grow my-4">
      <Calendar
        className="border rounded-md shadow-sm flex flex-col"
        classNames={{
          month: "space-y-4",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 sm:size-8 md:size-10 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          caption_label: "text-sm sm:text-base md:text-lg font-medium",
          head_cell:
            "text-muted-foreground rounded-md w-9 sm:w-10 md:w-12 font-normal text-[0.8rem]",
          cell: "size-9 sm:size-10 md:size-12 p-0",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "size-9 sm:size-10 md:size-12 p-0 font-normal text-base aria-selected:opacity-100",
          ),
          day_today: isToday(date) ? "" : "bg-accent text-accent-foreground",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/50 aria-selected:text-primary-foreground ",
        }}
        modifiers={{ hasSession: datesWithSessions }}
        modifiersClassNames={{ hasSession: "date-with-dot" }}
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date ?? new Date())}
        required
      />
      <GameSessionProvider
        value={{
          date: format(date, "yyyy-MM-dd"),
          canCreate: data?.canCreate ?? false,
          ...data?.data,
        }}
      >
        <div className="*:min-h-60 w-full shadow-sm sm:w-1/2 sm:min-w-[400px] lg:w-1/3">
          {isLoading ? (
            <SkeletonViewSessionCard />
          ) : data?.exists ? (
            <AdminViewSessionCard
              id={data.data.id}
              title={formatTitle(date)}
              startTime={convertTo12HourFormat(data.data.startTime)}
              endTime={convertTo12HourFormat(data.data.endTime)}
              locationName={data.data.locationName}
              locationAddress={data.data.locationAddress}
              attendees={data.data.attendees}
              capacity={data.data.capacity}
              state={getSessionState(
                parse(
                  `${data.data.date} ${data.data.startTime}`,
                  "yyyy-MM-dd HH:mm:ss",
                  new Date(),
                ),
              )}
            />
          ) : (
            <EmptyAdminViewSessionCard />
          )}
        </div>
      </GameSessionProvider>
    </div>
  );
}
