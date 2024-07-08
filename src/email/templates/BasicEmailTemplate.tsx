import React from "react";
import { Body, Head, Html, Text } from "@react-email/components";
import { render } from "@react-email/render";

import { formatFullDate, getWeekday } from "@/lib/utils";

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

function NonMemberEmail(props: { bookingDetails: BookingDetail[] }) {
  const { bookingDetails } = props;
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Text style={text}>Hi there,</Text>
        <Text style={text}>
          This is an email to confirm that you have secured a spot for our
          session.
        </Text>

        {bookingDetails.map((bookingDetail) => (
          <>
            <Text style={text}>
              The details for our {getWeekday(bookingDetail.date)} session are
              as follows:
            </Text>
            <ul>
              <li>Date: {formatFullDate(bookingDetail.date)} </li>
              <li>
                Time: {bookingDetail.startTime} - {bookingDetail.endTime}
              </li>
              <li>
                Venue: {bookingDetail.locationName} (
                {bookingDetail.locationAddress}){" "}
              </li>
            </ul>
          </>
        ))}

        <Text style={text}>
          Please transfer $8 to the following bank account, reply to this email
          with a screenshot of payment before attending the season.
        </Text>
        <Text style={text}>
          Bank Details: Name: Auckland University Badminton Club Account Number:
          12-3050-0485708-00
        </Text>
        <Text style={text}>
          Particular: UABCS1 Code: First Name Reference: Last Name
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

function MemberEmail(props: { bookingDetails: BookingDetail[] }) {
  const { bookingDetails } = props;
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Text style={text}>Hi there,</Text>
        <Text style={text}>
          Great news! Your badminton session bookings with the University of
          Auckland Badminton Club are confirmed.
        </Text>

        {bookingDetails.map((bookingDetail) => (
          <>
            <Text style={text}>
              The details for our {getWeekday(bookingDetail.date)} session are
              as follows:
            </Text>
            <ul>
              <li>Date: {formatFullDate(bookingDetail.date)} </li>
              <li>
                Time: {bookingDetail.startTime} - {bookingDetail.endTime}
              </li>
              <li>
                Venue: {bookingDetail.locationName} (
                {bookingDetail.locationAddress}){" "}
              </li>
            </ul>
          </>
        ))}
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

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const EmailTemplate = (
  memberType: boolean,
  bookingDetails: BookingDetail[]
) => {
  return {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: render(
          memberType ? (
            <MemberEmail bookingDetails={bookingDetails} />
          ) : (
            <NonMemberEmail bookingDetails={bookingDetails} />
          )
        ),
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Basic Email Template",
    },
  };
};

export { EmailTemplate };
