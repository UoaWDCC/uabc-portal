/***
 * @author Peter An <anpeteran2@gmail.com>
 */

import { Schema, InferSchemaType, model, Types } from "mongoose";

// Schema
const cartSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  sessions: [{ type: Types.ObjectId, ref: "DBSession" }],
});

export type ICart = InferSchemaType<typeof cartSchema>;

export const DBCart = model("DBCart", cartSchema);
