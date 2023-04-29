/***
 * @author Michael Howell <mh.michaelhowell@gmail.com>
 */

import { Schema, model } from "mongoose";

export const paymentSchema = new Schema({
    amount: Number,
    userId: String,
    bookingId: String,
    method: String,
    time: Number,
});

export const DBPayment = model('DBPayment', paymentSchema);