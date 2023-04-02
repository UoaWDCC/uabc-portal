import { Controller, Path, Post, Route } from "tsoa";
import { Booking } from "./booking";
import { BookingService } from "./booking.service";

@Route("booking")
export class BookingsController extends Controller {
    @Post("/refund/{bookingId}")
    public async refund(@Path() bookingId: number): Promise<Booking> {
        return new BookingService().refund(bookingId);
    }

    @Post("/cancel/{bookingId}")
    public async cancel(@Path() bookingId: number): Promise<Booking> {
        return new BookingService().cancel(bookingId);
    }
}
