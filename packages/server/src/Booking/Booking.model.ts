/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

import { PaymentMethod } from "src/Payment/Payment.model";

export class Booking {
  constructor(
    public id: string,
    public userId: string,
    public sessionId: string,
    public createdAt: Date,
    public paymentMethod: PaymentMethod,
    public status: BookingStatus
  ) {}
}

/**
 * Different types of booking status.
 */
// TODO: update with actual values.
export enum BookingStatus {
  AVAILABLE = "AVAILABLE",
}
