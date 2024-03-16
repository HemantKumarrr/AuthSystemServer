const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASS
    }
})


const sendMailReset = async (receiverMail, resetUrl)=> {
    const mailOptions = {
        from: process.env.MY_GMAIL,
        to: receiverMail,
        subject: "Reset your password",
        text: `
        Hi ${receiverMail},

        We got a request to reset your password.
        
        ${resetUrl}
        
        If you ignore this message, your password will not be changed. 
        
        Thanks`
    }

    try {
        const sendingMail = await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err);
    }

}

module.exports = sendMailReset;