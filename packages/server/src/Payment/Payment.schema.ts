/***
 * @author Michael Howell <mh.michaelhowell@gmail.com>
 */

import { Schema, model } from "mongoose";

export interface IPayment {
    _id?: string
    amount: number
    userId: string
    bookingId: string
    method: string
    time: number
}

export const paymentSchema = new Schema<IPayment>({
    amount: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    bookingId: {
        type: String,
        require: true
    },
    method: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        require: true
    },
});

export const DBPayment = model<IPayment>('DBPayment', paymentSchema);