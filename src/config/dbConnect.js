const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        const MONG_URI = process.env.MONGO_URI;
        await mongoose.connect(MONG_URI, {autoIndex: true});
        console.log("******************* Database connection acquired *******************")
    } catch (error) {
        console.log(`******************* Database connection failed: ${error}`);
        process.exit(1);
    }
}

module.exports = dbConnect;