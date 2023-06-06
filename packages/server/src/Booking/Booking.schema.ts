/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

import { Schema, model } from "mongoose";
import { PaymentMethod } from "src/Payment/Payment.model";
import { BookingStatus } from "./Booking.model";

export interface IBooking {
  id: string;
  userId: string;
  sessionId: string;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
}

export const bookingSchema = new Schema<IBooking>({
  id: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  sessionId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

export const DBBooking = model<IBooking>("DBBooking", bookingSchema);
