import { Types } from "mongoose";
import { Booking, BookingModel } from "./booking";

export class BookingService {
    public async refund(id: number) {
        // mock return
        const booking = await BookingModel.findOne();
        if (booking) {
            return booking;
        }
        return {
            userId: new Types.ObjectId(id),
            sessionId: new Types.ObjectId(),
            createdAt: Date.now(),
            paymentMethod: new Types.ObjectId(),
            status: "Pending",
        };
    }

    public cancel(id: number): Booking {
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
