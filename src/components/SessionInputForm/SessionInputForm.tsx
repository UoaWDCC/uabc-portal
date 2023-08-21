/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import DatePicker from "react-datepicker";
import Button from "../Button/Button";
import Card from "../Card/Card";
import "react-datepicker/dist/react-datepicker.css";
import { GameSession } from "@prisma/client";
import { ObjectId } from "bson";
import SessionInputFormProps from "./SessionInputFormProps";
import { useMutation } from "@tanstack/react-query";

// // TODO: Make this work
// const createSession = async (data: GameSession) => {
//     const response = await fetch("api/gamesession", {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     const res = await response.json();
//     console.log(res);
//     return res
// };


const SessionInputForm = (props: SessionInputFormProps) => {
    const [bookingClose, setBookingClose] = useState(new Date());
    const [bookingOpen, setBookingOpen] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [maxUsers, setMaxUsers] = useState(0);
    const [maxUsersError, setMaxUsersError] = useState(false);

    const mutation = useMutation({
        mutationFn: (data: GameSession) => {
            return fetch('api/gamesession', {
                method: 'POST',
                body: JSON.stringify(data),  // Bug: converts dates to strings so it fails to validate
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    })

    const handleStartTimeChange = (date: Date | null) => {
        if (date != null) {
            setStartTime(date);
        }
    }

    const handleEndTimeChange = (date: Date | null) => {
        if (date != null) {
            setEndTime(date);
        }
    }

    const handleBookingCloseChange = (date: Date | null) => {
        if (date != null) {
            setBookingClose(date);
        }
    }

    const handleBookingOpenChange = (date: Date | null) => {
        if (date != null) {
            setBookingOpen(date);
        }
    }

    const onSubmit = async () => {
        if (!maxUsersError) {
            const data = {
                id: Math.random().toString(36).slice(2),  // TODO: Replace with ObjectId
                bookingClose: bookingClose,
                bookingOpen: bookingOpen,
                startTime: startTime,
                endTime: endTime,
                location: location,
                maxUsers: maxUsers
            } as GameSession;

            console.log(data);

            // createSession(data);
            mutation.mutate(data);
            
            if (props.callback != undefined) {
                props.callback();
            }
        }
    }

    const handleMaxUsersChange = (value: string) => {
        const parsed_value = Number(value);
        if (!isNaN(parsed_value) && Number.isInteger(parsed_value) && parsed_value >= 0) {
            setMaxUsersError(false)
            setMaxUsers(parsed_value)
        } else {
            setMaxUsersError(true);
        }
    }

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
                    <p className="text-red-500 text-sm">Must be a non-negative integer</p>
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
                <Button label="Create Session" onClick={onSubmit} widthFull/>
            </div>
        </Card>
    )
}

export default SessionInputForm