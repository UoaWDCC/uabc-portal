import mongoose from "mongoose";

const db = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        if (true) {
            await mongoose.connect("mongodb+srv://mhow865:ZH5UcJcTnp9XXsR0@uabc-dev.iwltwgj.mongodb.net/?retryWrites=true&w=majority");
            console.log("MongoDB is Connected...");
        } else {
            throw new Error("Please provide MONGODB_URI in the .env file");
        }
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
};