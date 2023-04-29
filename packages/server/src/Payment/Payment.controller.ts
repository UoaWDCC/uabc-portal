/***
 * @author Michael Howell <mh.michaelhowell@gmail.com>
 */

import {
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
} from "tsoa";
import { Payment, PaymentMethod } from "./Payment.model";
import { PaymentRepo } from "./Payment.repo";

@Route("payment")
export class PaymentController extends Controller {
    @Get("{paymentId}")
    public async getPayment(
        @Path() paymentId: string,
    ): Promise<Payment | null> {
        return await new PaymentRepo().get(paymentId)
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createPayment(
    ): Promise<void> {
        await new PaymentRepo().add(new Payment(15.00, "someUser", "someBooking", PaymentMethod.DIRECT, 129))
        this.setStatus(201); // set return status 201
        return;
    }
}