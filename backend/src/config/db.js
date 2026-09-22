import ENV from "./ENV.local.js";
import mongoose from "mongoose";

export const connectDb = async() => {
    try {
       await mongoose.connect(ENV.MONGO_URL);
        console.log("db connected");
    } catch (error) {
        console.log("error in db connection", error);
    }
}