import { Payment, PaymentMethod } from "./Payment.model";
import { DBPayment } from "./Payment.schema";


export class PaymentRepo {

    async add(payment: Payment) {
        const savedPayment = await DBPayment.create(payment.toDBO())
        return new Payment(savedPayment.amount!, savedPayment.userId!, savedPayment.bookingId!, PaymentMethod[savedPayment.method! as keyof typeof PaymentMethod], savedPayment.time!)
    }

    async get(id: string): Promise<Payment | null> {
        const getPayment = await DBPayment.findById(id)

        if (!getPayment) {
            return null
        }

        return new Payment(getPayment.amount!, getPayment.userId!, getPayment.bookingId!, PaymentMethod[getPayment.method! as keyof typeof PaymentMethod], getPayment.time!, getPayment._id.toString())
    }

}