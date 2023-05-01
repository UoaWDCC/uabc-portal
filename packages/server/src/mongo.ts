import mongoose from "mongoose";

const db = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        if (db) {
            await mongoose.connect(db);
            console.log("MongoDB is Connected...");
        } else {
            throw new Error("Please provide MONGODB_URI in the .env file");
        }
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
};