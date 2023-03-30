import { Schema, Types, model } from "mongoose";
import { HttpError } from "./http-error";

interface IBooking {
    // userId: Types.ObjectId;
    // sessionId: Types.ObjectId;
    // createdAt: Date;
    // paymentMethod: Types.ObjectId;
    // status: Types.ObjectId;
    name: string;
}

const bookingSchema = new Schema<IBooking>({
    name: { type: String },
    // userId: { type: Schema.Types.ObjectId, required: true },
    // sessionId: { type: Schema.Types.ObjectId, required: true },
    // createdAt: { type: Date, default: Date.now },
    // paymentMethod: { type: Schema.Types.ObjectId, required: true },
    // status: { type: Schema.Types.ObjectId, required: true },
});

export const Booking = model<IBooking>("Booking", bookingSchema);

// const b = new Booking({
//     userId: "",
//     sessionId: "",
//     createdAt: Date.now(),
//     paymentMethod: "",
//     status: "",
// });

const b = new Booking({
    name: "Peter",
});

try {
    b.save();
} catch (err) {
    new HttpError("Creating new booking failed, please try again.", 500);
}

console.log(b.name);
