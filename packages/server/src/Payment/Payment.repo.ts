import { Payment, PaymentMethod } from "./Payment.model";
import { DBPayment, paymentSchema } from "./Payment.schema";
import { InferSchemaType } from 'mongoose';


export class PaymentRepo {

    async add(payment: Payment): Promise<Payment> {
        const savedPayment = await DBPayment.create(PaymentRepo.paymentToDbo(payment))
        payment.id = savedPayment._id.toString()
        return payment
    }

    async get(id: string): Promise<Payment | null> {
        const getPayment = await DBPayment.findById(id)

        if (!getPayment) {
            return null
        }

        return PaymentRepo.DboToPayment(getPayment);
    }

    
    static paymentToDbo(payment: Payment) {
        return {
            _id: payment.id,
            amount: payment.amount,
            userId: payment.userId,
            bookingId: payment.bookingId,
            method: payment.method.valueOf(),
            time: payment.time,
        }
    }

    static DboToPayment(dbo: InferSchemaType<typeof paymentSchema>): Payment {
        return new Payment(dbo.amount, dbo.userId, dbo.bookingId, PaymentMethod[dbo.method as keyof typeof PaymentMethod], dbo.time, dbo._id)
    }

}