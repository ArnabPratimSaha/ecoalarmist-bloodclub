const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
require("dotenv").config();
const { errorHandler } = require("./Controllers/ErrorHandler");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw())
app.use(express.urlencoded({extended : true}))

const connectMongoBD = () => {
    mongoose.connect(process.env.MONGODBSERVER, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log(error);
    })
}

connectMongoBD();

const sendOTPForSignup = require('./routes/sendOTPForSignup');
const sendOTPForLogin = require('./routes/sendOTPForLogin');
const verifyOTP = require('./routes/verifyOTP')
const signup = require('./routes/signUp');

app.use("/sendotpforsignup", sendOTPForSignup);
app.use("/verifyotp", verifyOTP);
app.use('/sendotpforlogin', sendOTPForLogin)
app.use('/sign', signup)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})