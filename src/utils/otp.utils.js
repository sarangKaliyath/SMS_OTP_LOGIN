const fastTwoSms = require("fast-two-sms");
require("dotenv").config();

const generateOtp = (optLength) => {

    const char  = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let otp = "";

    for(let i = 0; i < optLength; i++){
        otp += char[Math.floor(Math.random() * 36)];
    }
    
    return otp;
}

const fast2sms = async({message, contactNumber}, next) => {
    try {
        const res = await fastTwoSms.sendMessage({
            authorization: process.env.FAST_TWO_SMS,
            message,
            numbers: [contactNumber]
        })
        console.log({res});
    } catch (error) {
        next(error)
    }
}

module.exports = {generateOtp, fast2sms};