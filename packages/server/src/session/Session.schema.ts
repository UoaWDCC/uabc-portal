/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import { Schema, model } from 'mongoose';

export interface ISession {
  id: string;
  location: string;
  dateTime: Date;
  maxUsers: number;
  bookingOpen: Date;
  bookingClose: Date;
}

export const sessionSchema = new Schema<ISession>({
  id: { type: String, required: true },
  location: { type: String, required: true },
  dateTime:  { type: Date, required: true },
  maxUsers:  { type: Number, required: true },
  bookingOpen: { type: Date, required: true },
  bookingClose: { type: Date, required: true }
});

export const DBSession = model<ISession>('DBSession', sessionSchema);