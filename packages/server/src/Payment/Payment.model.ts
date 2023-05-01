/***
 * @author Michael Howell <mh.michaelhowell@gmail.com>
 */

export class Payment {
    constructor(
        public amount: number,
        public userId: string,
        public bookingId: string,
        public method: PaymentMethod,
        public time: number,
        public id?: string,
    ) {}
}

export enum PaymentMethod {
    STRIPE = "STRIPE",
    DIRECT = "DIRECT"
}