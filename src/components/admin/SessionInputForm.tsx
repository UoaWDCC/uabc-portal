/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React, { useState } from "react";
import { TextInput } from "../TextInput";
import DatePicker from "react-datepicker";
import { Button } from "../Button";
import { Card } from "../Card";
import "react-datepicker/dist/react-datepicker.css";
import { GameSession } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

type SessionInputFormProps = {
  onSuccess?: () => void;
};

export const SessionInputForm = (props: SessionInputFormProps) => {
  const [bookingClose, setBookingClose] = useState(new Date());
  const [bookingOpen, setBookingOpen] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [maxUsers, setMaxUsers] = useState(0);
  const [maxUsersError, setMaxUsersError] = useState(false);

  const mutation = useMutation({
    mutationFn: async (sessionData: Omit<GameSession, "id">) => {
      const response = await fetch("/api/game-session", {
        method: "POST",
        body: JSON.stringify(sessionData),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await response.json();
      console.log(data);
      return data;
    },
    onSuccess: props.onSuccess,
  });

  const handleStartTimeChange = (date: Date | null) => {
    if (date != null) {
      setStartTime(date);
    }
  };

  const handleEndTimeChange = (date: Date | null) => {
    if (date != null) {
      setEndTime(date);
    }
  };

  const handleBookingCloseChange = (date: Date | null) => {
    if (date != null) {
      setBookingClose(date);
    }
  };

  const handleBookingOpenChange = (date: Date | null) => {
    if (date != null) {
      setBookingOpen(date);
    }
  };

  const onSubmit = async () => {
    if (!maxUsersError) {
      const data = {
        bookingClose: bookingClose,
        bookingOpen: bookingOpen,
        startTime: startTime,
        endTime: endTime,
        location: location,
        maxUsers: maxUsers,
      } as Omit<GameSession, "id">;

      console.log(data);

      mutation.mutate(data);
    }
  };

  const handleMaxUsersChange = (value: string) => {
    const parsed_value = Number(value);
    if (
      !isNaN(parsed_value) &&
      Number.isInteger(parsed_value) &&
      parsed_value >= 0
    ) {
      setMaxUsersError(false);
      setMaxUsers(parsed_value);
    } else {
      setMaxUsersError(true);
    }
  };

  return (
    <Card>
      <div className="my-5">
        <TextInput
          label="Location"
          value={location}
          onChange={setLocation}
          type="text"
          isError={false}
        />
      </div>

      <div className="my-5">
        <TextInput
          label="Maximum Users"
          value={maxUsers.toString()}
          onChange={handleMaxUsersChange}
          type="text"
          isError={maxUsersError}
        />
        <div hidden={!maxUsersError}>
          <p className="text-sm text-red-500">Must be a non-negative integer</p>
        </div>
      </div>

      <div className="my-5">
        <p>Start Time</p>
        <DatePicker
          selected={startTime}
          onChange={handleStartTimeChange}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div className="my-5">
        <p>End Time</p>
        <DatePicker
          selected={endTime}
          onChange={handleEndTimeChange}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div className="my-5">
        <p>Booking Open</p>
        <DatePicker
          selected={bookingOpen}
          onChange={handleBookingOpenChange}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div className="my-5">
        <p>Booking Close</p>
        <DatePicker
          selected={bookingClose}
          onChange={handleBookingCloseChange}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div className="my-5">
        <Button label="Create Session" onClick={onSubmit} widthFull />
      </div>
    </Card>
  );
};
