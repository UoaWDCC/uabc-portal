import React from "react";
import { format, isToday, parse } from "date-fns";

import { AdminViewSessionCard } from "@/components/admin/AdminViewSessionCard";
import { EmptyAdminViewSessionCard } from "@/components/admin/EmptyAdminViewSessionCard";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGameSession } from "@/hooks/query/useGameSession";

export default function ClientViewSessionsPage() {
  const [date, setDate] = React.useState<Date>(new Date());

  const { data, isLoading } = useGameSession(format(date, "yyyy-MM-dd"));

  function formatTimeString(timeString: string) {
    console.log(timeString);
    return format(parse(timeString, "HH:mm:ss", new Date()), "h:mma");
  }

  function getState(date: Date) {
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
        className="border rounded-md shadow-sm"
        classNames={{
          cell: "h-9 w-9 text-center text-sm p-0 relative",
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
        // showOutsideDays={false}
        required
      />

      {isLoading ? (
        <Skeleton className="h-56 w-full shadow-sm sm:w-1/2 lg:w-1/3" />
      ) : data ? (
        <AdminViewSessionCard
          id={data.id}
          title={format(date, "eeee do MMMM yyyy")}
          startTime={formatTimeString(data.startTime)}
          endTime={formatTimeString(data.endTime)}
          locationName={data.locationName}
          locationAddress={data.locationAddress}
          attendees={data.attendees}
          capacity={data.capacity}
          state={getState(
            parse(
              `${data.date} ${data.startTime}`,
              "yyyy-MM-dd HH:mm:ss",
              new Date(),
            ),
          )}
          className="w-full shadow-sm sm:w-1/2 lg:w-1/3"
        />
      ) : (
        <EmptyAdminViewSessionCard
          title={format(date, "eeee do MMMM yyyy")}
          className="h-56 w-full shadow-sm sm:w-1/2 lg:w-1/3 xl:w-1/4"
        />
      )}
    </div>
  );
}
