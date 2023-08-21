/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React, { useState } from "react";
import SessionInputFormProps from "./SessionInputFormProps";
import TextInput from "../TextInput/TextInput";
import DatePicker from "react-datepicker";
import Button from "../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../Card/Card";
import NumberInput from "../NumberInput/NumberInput";

// TODO: Database connection

// model GameSession {
//     id           String   @id @default(auto()) @map("_id") @db.ObjectId
//     bookingClose DateTime
//     bookingOpen  DateTime
//     startTime    DateTime
//     endTime      DateTime
//     location     String
//     maxUsers     Int
//   }

const SessionInputForm = (props: SessionInputFormProps) => {
    const [bookingClose, setBookingClose] = useState(new Date());
    const [bookingOpen, setBookingOpen] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [maxUsers, setMaxUsers] = useState(0);

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

    const onSubmit = () => {
        alert(location + "\n" + startTime + "\n" + endTime + "\n" + bookingOpen + "\n" + bookingClose + "\n" + maxUsers);
    }

    const handleMaxUsersChange = (value: string) => {
        // TODO: validation
        setMaxUsers(Number(value))
    }

    return (
        <Card>
            <div className="my-5">
                <TextInput label="Location" value={location} onChange={setLocation} type="text" isError={false}/>
            </div>
            <div className="my-5">
                <TextInput label="Maximum Users" value={maxUsers.toString()} onChange={handleMaxUsersChange} type="text" isError={false}/>
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
                <Button label="Submit" onClick={onSubmit} widthFull/>
            </div>
        </Card>
    )
}

export default SessionInputForm