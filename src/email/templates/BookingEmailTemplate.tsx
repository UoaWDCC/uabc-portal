import React from "react";
import { Body, Head, Html, Text } from "@react-email/components";
import { render } from "@react-email/render";

import { convertTo12HourFormat, formatFullDate, getWeekday } from "@/lib/utils";

interface BookingDetail {
  id: number;
  date: string;
  gameSessionScheduleId: number | null;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  capacity: number;
  casualCapacity: number;
  bookingOpen: Date;
  bookingClose: Date;
}
[];

function NonMemberEmail(props: {
  firstName: string;
  bookingDetails: BookingDetail[];
}) {
  const { firstName, bookingDetails } = props;
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Text>Hi {firstName},</Text>
        <Text>
          This is an email to confirm that you have secured a spot for our
          session.
        </Text>

        {bookingDetails.map((bookingDetail) => (
          <>
            <Text>
              The details for our {getWeekday(bookingDetail.date)} session are
              as follows:
            </Text>
            <ul>
              <li>Date: {formatFullDate(bookingDetail.date)} </li>
              <li>
                Time: {convertTo12HourFormat(bookingDetail.startTime)} -{" "}
                {convertTo12HourFormat(bookingDetail.endTime)}
              </li>
              <li>
                Venue: {bookingDetail.locationName} (
                {bookingDetail.locationAddress}){" "}
              </li>
            </ul>
          </>
        ))}

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
      </Body>
    </Html>
  );
}

function MemberEmail(props: {
  firstName: string;
  bookingDetails: BookingDetail[];
}) {
  const { firstName, bookingDetails } = props;
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Text>Hi {firstName},</Text>
        <Text>
          Great news! Your badminton session bookings with the University of
          Auckland Badminton Club are confirmed. Here are the details for your
          upcoming sessions:
        </Text>

        <ol>
          {bookingDetails.map((bookingDetail) => (
            <li key={bookingDetail.id}>
              {getWeekday(bookingDetail.date)}{" "}
              {formatFullDate(bookingDetail.date)} :
              <ul>
                <li>
                  Time: {convertTo12HourFormat(bookingDetail.startTime)} -{" "}
                  {convertTo12HourFormat(bookingDetail.endTime)}
                </li>
                <li>
                  Venue: {bookingDetail.locationName} (
                  {bookingDetail.locationAddress}){" "}
                </li>
              </ul>
            </li>
          ))}
        </ol>
        <Text>We&apos;ll see you on the courts! &#127992;</Text>
        <Text>
          Best Regards,
          <br />
          The UABC Team
        </Text>
      </Body>
    </Html>
  );
}

const BookingEmailTemplate = (
  firstName: string,
  memberType: boolean,
  bookingDetails: BookingDetail[]
) => {
  return {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: render(
          memberType ? (
            <MemberEmail
              firstName={firstName}
              bookingDetails={bookingDetails}
            />
          ) : (
            <NonMemberEmail
              firstName={firstName}
              bookingDetails={bookingDetails}
            />
          )
        ),
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Session Booking Confirmation",
    },
  };
};

export { BookingEmailTemplate };
