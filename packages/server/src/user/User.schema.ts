import { Schema, model } from "mongoose";
import { University,UniversityID, Difficulty } from "./User.model";

export interface IUser {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,

    isMember: Boolean,
    sessionsRemaining: Number,

    previousDifficulty: Difficulty,

    university?: University,
    universityID?: UniversityID
}

export const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        require: true
    },
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
        type: University,
    },
    universityID: {
        type: UniversityID,
    },
});

export const DBUser = model<IUser>('DBUser', userSchema);