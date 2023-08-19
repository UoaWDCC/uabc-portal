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

// TODO: Database connection

const SessionInputForm = (props: SessionInputFormProps) => {
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date: Date | null) => {
        if (date != null) {
            setStartDate(date);
        }
    }

    const handleEndDateChange = (date: Date | null) => {
        if (date != null) {
            setEndDate(date);
        }
    }

    const onSubmit = () => {
        alert(location + "\n" + startDate + "\n" + endDate);
    }

    return (
        <Card>
            <div className="my-5">
                <TextInput label="Location" value={location} onChange={setLocation}/>
            </div>
            <div className="my-5">
                <p>Start Date</p>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </div>
            <div className="my-5">
                <p>End Date</p>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
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