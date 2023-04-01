import mongoose from "mongoose";

const db =
    "mongodb+srv://anpeteran:%21%40%23peter@cluster0.ikez69m.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
    try {
        if (db) {
            await mongoose.connect(db);
            console.log("MongoDB is Connected...");
        } else {
            throw new Error("Please provide MONGODBURI in .env file");
        }
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
};
