const User = require("../models/user.model");
const {createToken} = require("../utils/token.utils");
const {generateOtp, fast2sms} = require("../utils/otp.utils");
const twilio = require("twilio");


const registerUser = async (req, res, next) => {
    try {
        let {phone, name} = req.body;

        const isPhoneNoTaken = await User.findOne({phoneNo: phone});

        if(isPhoneNoTaken){
            return res.status(400).json({message: 'Phone Number already taken!'});
        }

        const newUser = new User({
            phone,
            name
        });

        const user = await newUser.save();

        res.status(200).json({
            type: "success",
            message: "Otp sent for verification!",
            data: {
                userId: user._id
            }
        })

        const otp = generateOtp(6);

        user.otp = otp;
        await user.save();

        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

        return client.messages.create({
            body: `This is your verification OTP ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: process.env.ADMIN_PHONE
        }).then(msg => console.log({msg})).catch((err) => console.log({err}));


    } catch (error) {
        console.log({error})
        return res.status(500).json({message: "Internal Server Error", error: error})
    }
}

module.exports = {registerUser};