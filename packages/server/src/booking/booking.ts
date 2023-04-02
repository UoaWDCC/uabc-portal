import mongoose, { InferSchemaType, Schema } from "mongoose";

const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    sessionId: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Number, default: Date.now },
    paymentMethod: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
});

export type Booking = InferSchemaType<typeof bookingSchema>;

export const BookingModel = mongoose.model("Booking", bookingSchema);
