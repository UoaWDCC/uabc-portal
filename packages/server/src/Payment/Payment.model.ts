/***
 * @author Michael Howell <mh.michaelhowell@gmail.com>
 */

/**
 * Represents a transaction that is made by a user for a booking.
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

/**
 * The ways in which a Payment may have been faciliated.
 */
export enum PaymentMethod {
    STRIPE = "STRIPE",
    DIRECT = "DIRECT"
}