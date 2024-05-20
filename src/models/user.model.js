const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    otp: String,
},
    {timestamps: true}
)

module.exports = model("User", UserSchema);