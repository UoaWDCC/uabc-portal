/**
 * @author Aditya Tendulkar <aten037@aucklanduni.ac.nz>
 */

import { Schema, model } from "mongoose";
import { University,UniversityID, Difficulty } from "./User.model";

export interface IUser {
    _id?: string
    firstName: string,
    lastName: string,
    email: string,

    isMember: Boolean,
    sessionsRemaining: Number,

    previousDifficulty: string,

    university?: string,
    universityID?: string
}

export const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    isMember: {
        type: Boolean,
        require: true
    },
    sessionsRemaining: {
        type: Number,
        require: true
    },
    previousDifficulty: {
        type: String,
        require: true
    },
    university: {
        type: String,
    },
    universityID: {
        type: String,
    },
});

export const DBUser = model<IUser>('DBUser', userSchema);