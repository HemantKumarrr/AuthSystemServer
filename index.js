const express = require('express');
const connectDB = require('./config/mogodb');
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://auth-system-client.vercel.app',
}))
app.use(express.json())

// Routes
app.use(authRouter)
app.use(userRouter)


app.listen(PORT, ()=> {
    console.log("Listening at PORT : ", PORT);
});