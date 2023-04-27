import { Types } from "mongoose";
import { Booking, BookingModel } from "./booking";
import { HttpError } from "../utils/http-error";

export class BookingService {
    public async refund(id: string) {
        let foundBooking;

        try {
            foundBooking = await BookingModel.findById(id);
        } catch (err) {
            return new HttpError(
                "Finding service by id failed, please try again",
                500
            );
        }

        if (!foundBooking) {
            // write better status code
            return new HttpError(
                `Could not find the booking with the id ${id}.`,
                404
            );
        }

        foundBooking.status = "Refunded";

        try {
            foundBooking.save();
        } catch (err) {
            return new HttpError(
                "Saving booking failed, please try again.",
                500
            );
        }

        return foundBooking;
    }

    public cancel(id: string): Booking {
        // mock return
        return {
            userId: new Types.ObjectId(id),
            sessionId: new Types.ObjectId(),
            createdAt: Date.now(),
            paymentMethod: new Types.ObjectId(),
            status: "Pending",
        };
    }
}
