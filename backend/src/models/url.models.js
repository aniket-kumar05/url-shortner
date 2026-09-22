import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true
    },
    clickCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const UrlModel = mongoose.model("urls", urlSchema);

export default UrlModel