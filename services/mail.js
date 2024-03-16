const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASS
    }
})


const sendMail = async (receiverMail, OTPcode)=> {
    const mailOptions = {
        from: process.env.MY_GMAIL,
        to: receiverMail,
        subject: "One-time verification code",
        text: `
        Verification code
        Please use the verification code below.
        
        ${OTPcode}
        
        If you didn’t request this, you can ignore this email.
        
        Thanks`
    }

    try {
        const sendingMail = await transporter.sendMail(mailOptions)
        console.log("otp mail sent")
    } catch (err) {
        console.log(err);
    }

}

module.exports = sendMail;