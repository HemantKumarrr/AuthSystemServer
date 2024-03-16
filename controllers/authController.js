const User = require("../models/User");
const jwt = require("jsonwebtoken");
const UserOTP = require("../models/sendOTP");
const sendMail = require("../services/mail");
const sendMailReset = require("../services/resetMail");

// creating jwt function
const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRECT_KEY, { expiresIn: "1d" });
  return token;
};

// validation error handling
const handleError = (err) => {
  const error = { email: "", password: "" };
  // Unique email validation
  if (err.code === 11000) {
    error.email = "email already registered";
    return error;
  }

  // email and password validation
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = await User.create({ username, email, password });
    const token = createToken(data._id);
    res.json({ uid: data._id, authToken: token });
  } catch (err) {
    const isError = handleError(err);
    res.status(400).json(isError);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const data = await User.login(email, password);
    const token = createToken(data._id);
    const verifiedOTP = await UserOTP.findOne({ email });
    if (verifiedOTP.otp === otp) {
      res.json({ uid: data._id, authToken: token, message: "OTP verified" });
    } else {
      res.status(400).json({ message: "Wrong otp" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const validEmail = await User.findOne({ email });
    if (!validEmail) return res.status(400).json({ error: "user not found" });
    const otp = Math.floor(Math.random() * 900000 + 100000);
    const exitsEmail = await UserOTP.findOne({ email });
    if (exitsEmail) {
      const updateOTP = await UserOTP.updateOne(
        { _id: exitsEmail._id },
        { $set: { otp } }
      );
      sendMail(email, otp);
      res.send({ message: "OTP sent successfully" });
    } else {
      const saveOTP = await UserOTP.create({ email: email, otp: otp });
      sendMail(email, otp);
      res.send({ message: "OTP sent successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: "something went wrong!" });
    console.log(err);
  }
};

module.exports.forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    const validEmail = await User.findOne({ email });
    if (!validEmail) return res.status(400).json({ message: "no user found" });
    const resetUrl = `https://auth-system-client.vercel.app/forgot-password/user/reset-password`;
    sendMailReset(email, resetUrl);
    res.status(200).json({ message: "Check your mail" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports.reset_password = async (req, res) => {
  try {
    const { password } = req.body;
    const userData = await User.findOne({ email });
    const updatePassword = await User.updateOne(
      { _id: userData._id },
      { $set: { password } }
    );
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
