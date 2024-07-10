import React from "react";
import { Text } from "@react-email/components";

import { capitalize, convertTo12HourFormat, formatFullDate } from "@/lib/utils";
import EmailLayout from "./EmailLayout";

interface BookingDetail {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  playLevel: string;
}
[];

interface MemberBookingConfirmationEmailProps {
  firstName: string;
  bookingDetails: BookingDetail[];
}

export default function MemberBookingConfirmationEmail({
  firstName,
  bookingDetails,
}: MemberBookingConfirmationEmailProps) {
  const plural = bookingDetails.length > 1;
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>
      <Text>
        Great news! Your badminton session booking{plural && "s"} with the
        University of Auckland Badminton Club {plural ? "are" : "is"} confirmed.
      </Text>

      <Text>
        Here are the details for your upcoming session{plural && "s"}:
      </Text>

      {bookingDetails.map((bookingDetail) => (
        <div key={bookingDetail.id}>
          <Text className="mb-0 font-semibold">
            {formatFullDate(bookingDetail.date)}
          </Text>
          <ul className="my-0">
            <li>
              Time: {convertTo12HourFormat(bookingDetail.startTime)} -{" "}
              {convertTo12HourFormat(bookingDetail.endTime)}
            </li>
            <li>
              Venue: {bookingDetail.locationName} (
              {bookingDetail.locationAddress}){" "}
            </li>
            <li>Play level: {capitalize(bookingDetail.playLevel)}</li>
          </ul>
        </div>
      ))}

      <Text>We&apos;ll see you on the courts! &#127992;</Text>
      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}

MemberBookingConfirmationEmail.PreviewProps = {
  firstName: "John",
  bookingDetails: [
    {
      id: 1,
      date: "2022-03-01",
      startTime: "18:00:00",
      endTime: "20:00:00",
      locationName: "Gym 1",
      locationAddress: "123 University St",
      playLevel: "intermediate",
    },
    {
      id: 2,
      date: "2022-03-02",
      startTime: "18:00:00",
      endTime: "20:00:00",
      locationName: "Gym 1",
      locationAddress: "123 University St",
      playLevel: "beginner",
    },
  ],
};
