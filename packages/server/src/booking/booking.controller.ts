import { Controller, Path, Post, Route, Response, SuccessResponse } from "tsoa";
import { Booking } from "./booking";
import { BookingService } from "./booking.service";
import { HttpError } from "src/utils/http-error";

@Route("booking")
export class BookingsController extends Controller {
    @Response(404, "Bad request")
    @Response(500, "Server error")
    @SuccessResponse("202", "Refunded") // custom success response
    @Post("/refund/{bookingId}")
    public async refund(@Path() bookingId: string) {
        return new BookingService().refund(bookingId);
    }

    @Post("/cancel/{bookingId}")
    public async cancel(@Path() bookingId: string): Promise<Booking> {
        return new BookingService().cancel(bookingId);
    }
}
