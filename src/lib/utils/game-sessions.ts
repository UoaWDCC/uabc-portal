import { endOfWeek, parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export function getZonedBookingOpenTime({
  bookingOpenDay,
  bookingOpenTime,
  gameSessionDate,
}: {
  bookingOpenDay: string;
  bookingOpenTime: string;
  gameSessionDate: string | Date;
}) {
  const bookingOpen = parse(
    `${bookingOpenDay} ${bookingOpenTime}`,
    "iiii HH:mm:ss",
    gameSessionDate
  );

  // If the booking open time is after the game session date, set it back a week
  if (bookingOpen > new Date(gameSessionDate)) {
    bookingOpen.setDate(bookingOpen.getDate() - 7);
  }

  return fromZonedTime(bookingOpen, "Pacific/Auckland");
}

export function getZonedBookingCloseTime(gameSessionDate: string | Date) {
  const bookingClose = endOfWeek(gameSessionDate, { weekStartsOn: 1 });

  return fromZonedTime(bookingClose, "Pacific/Auckland");
}
