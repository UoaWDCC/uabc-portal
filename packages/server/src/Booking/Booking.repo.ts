/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

import { InferSchemaType } from "mongoose";
import { Booking } from "./Booking.model";
import { DBBooking, bookingSchema } from "./Booking.schema";
import { PaymentMethod } from "src/Payment/Payment.model";

export class BookingRepo {
  /**
   * Adds a booking to the database
   * @param booking Booking object
   */
  async add(booking: Booking): Promise<Booking> {
    const savedBooking = await DBBooking.create(
      BookingRepo.bookingToDbo(booking)
    );
    booking.id = savedBooking._id.toString();
    return booking;
  }

  /**
   * Finds a booking in the database that matches the provided id or returns null if none exists
   * @param id id of booking as string
   * @returns Booking object or null if booking doesn't exist
   */
  async getById(id: string): Promise<Booking | null> {
    const getBooking = await DBBooking.findById(id);

    if (!getBooking) {
      return null;
    }

    return BookingRepo.dboToBooking(getBooking);
  }

  /**
   * Finds a booking in the database that matches the provided id and updates it with the provided data or returns null if none exists
   * @param booking Booking object
   * @returns Booking object if object exists, null if not
   */
  async update(booking: Booking): Promise<Booking | null> {
    const updatedBooking = await DBBooking.findByIdAndUpdate(
      booking.id,
      BookingRepo.bookingToDbo(booking)
    );
    if (!updatedBooking) {
      return null;
    }

    return booking;
  }

  /**
   * Takes a Booking object and returns a primitive object representing the database schema for booking.
   * @param booking Booking object
   * @returns primitive object of bookingSchema type
   */
  static bookingToDbo(booking: Booking): InferSchemaType<typeof bookingSchema> {
    return {
      id: booking.id,
      userId: booking.userId,
      sessionId: booking.sessionId,
      createdAt: booking.createdAt,
      paymentMethod: booking.paymentMethod,
      status: booking.status,
    };
  }

  /**
   * Takes a primitive object representing the database schema for booking and returns a Booking object
   * @param dbo primitive object of bookingSchema type
   * @returns Booking object
   */
  static dboToBooking(dbo: InferSchemaType<typeof bookingSchema>): Booking {
    return new Booking(
      dbo.id,
      dbo.userId,
      dbo.sessionId,
      dbo.createdAt,
      PaymentMethod[dbo.paymentMethod as keyof typeof PaymentMethod],
      dbo.status
    );
  }
}
