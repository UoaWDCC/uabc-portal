import { ObjectId } from "mongodb";
import { Payment, PaymentMethod } from "./Payment.model";
import { DBPayment, paymentSchema } from "./Payment.schema";
import { InferSchemaType } from 'mongoose';
import { log } from "console";


export class PaymentRepo {

    /**
     * Adds a Payment to the database
     */
    async add(payment: Payment): Promise<Payment> {
        const savedPayment = await DBPayment.create(PaymentRepo.paymentToDbo(payment))
        payment.id = savedPayment._id.toString()
        return payment
    }

    /**
     * Finds a payment in the database that matches the provided id or returns null if none exists
     */
    async getById(id: string): Promise<Payment | null> {
        const getPayment = await DBPayment.findById(id)

        if (!getPayment) {
            return null
        }

        return PaymentRepo.DboToPayment(getPayment);
    }

    /**
     * Finds a payment in the databse that matches the provided id and updates it with the provided data or returns null if none exists
     */
    async update(payment: Payment) {
        const updatedPayment = await DBPayment.findByIdAndUpdate(payment.id, PaymentRepo.paymentToDbo(payment))
        if (!updatedPayment) {
            return null
        }

        return payment
    }
    /**
     * Takes a Payment object and returns an primitive object representing the databse schema for payments
     */
    static paymentToDbo(payment: Payment): InferSchemaType<typeof paymentSchema> {
        return {
            _id: payment.id,
            amount: payment.amount,
            userId: payment.userId,
            bookingId: payment.bookingId,
            method: payment.method.valueOf(),
            time: payment.time,
        }
    }

    /**
     * Takes a primitive object representing the database schema for a payment and returns a Payment object
     */
    static DboToPayment(dbo: InferSchemaType<typeof paymentSchema>): Payment {
        return new Payment(dbo.amount, dbo.userId, dbo.bookingId, PaymentMethod[dbo.method as keyof typeof PaymentMethod], dbo.time, dbo._id)
    }

}