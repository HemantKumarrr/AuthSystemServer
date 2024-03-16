const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        validate: [ isEmail, "enter a valid email" ]
    },
    otp: {
        type: String,
        required: [true, "No OTP"],
    }
}, { timestamps: true })

const UserOTP = mongoose.model("userOTPs", userOTPSchema );

module.exports = UserOTP