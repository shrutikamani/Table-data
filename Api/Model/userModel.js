import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        countryCode: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        languages: {
            type: [String],
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }, { timestamps: true });

    export default mongoose.model("User" , userSchema);
    
