import { paymentSchema } from "./Payment.schema";

export class Payment {

    constructor(
        public amount: number,
        public userId: string,
        public bookingId: string,
        public method: PaymentMethod,
        public time: number,
        public id?: string,
    ) {}

    toDBO() {
        return {
            _id: this.id,
            amount: this.amount,
            userId: this.userId,
            bookingId: this.bookingId,
            method: this.method.valueOf(),
            time: this.time,
        }
    }

}

export enum PaymentMethod {
    STRIPE = "STRIPE",
    DIRECT = "DIRECT"
}