import React from "react";
import { Text } from "@react-email/components";

import { convertTo12HourFormat, formatFullDate } from "@/lib/utils";
import EmailLayout from "./EmailLayout";

import "./tailwind-config";

interface BookingDetail {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
}
[];

interface CasualBookingConfirmationEmailProps {
  firstName: string;
  bookingDetail: BookingDetail;
}

export default function CasualBookingConfirmationEmail({
  firstName,
  bookingDetail,
}: CasualBookingConfirmationEmailProps) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>
      <Text>
        Great news! Your badminton session booking with the University of
        Auckland Badminton Club is confirmed.
      </Text>
      <Text>Here are the details for your upcoming session:</Text>
      <Text className="mb-0 font-semibold">
        {formatFullDate(bookingDetail.date)}
      </Text>
      <ul className="my-0">
        <li>
          Time: {convertTo12HourFormat(bookingDetail.startTime)} -{" "}
          {convertTo12HourFormat(bookingDetail.endTime)}
        </li>
        <li>
          Venue: {bookingDetail.locationName} ({bookingDetail.locationAddress}){" "}
        </li>
      </ul>

      <Text>
        Please transfer $8 to the following bank account, reply to this email
        with a screenshot of payment before attending the season.
      </Text>
      <Text>
        Bank Details:
        <br />
        Name: Auckland University Badminton Club
        <br />
        Account Number: 12-3050-0485708-00
      </Text>
      <Text>
        Particular: UABCS1
        <br />
        Code: First Name
        <br />
        Reference: Last Name
      </Text>
      <Text>We&apos;ll see you on the courts! &#127992;</Text>
      <Text>
        Best Regards,
        <br />
        The UABC Team
      </Text>
    </EmailLayout>
  );
}

CasualBookingConfirmationEmail.PreviewProps = {
  firstName: "John",
  bookingDetail: {
    id: 1,
    date: "2022-03-01",
    startTime: "18:00:00",
    endTime: "20:00:00",
    locationName: "Gym 1",
    locationAddress: "123 University St",
  },
};
