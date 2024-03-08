const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = ()=> {
    const mongoUrl = process.env.MONGO_URL
    try {
        mongoose.connect(`${mongoUrl}`);
        console.log("connected to Databse successfully");
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;