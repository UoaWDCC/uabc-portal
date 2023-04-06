import mongoose, { InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true},
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},

    university: University,
    universityID: UniversityID,
    
    isMember: Boolean,
    sessionsReamining: Number,

    previousDifficulty: Difficulty
  });

  export type User = InferSchemaType<typeof userSchema>;

  export const UserModel = mongoose.model("User", userSchema);