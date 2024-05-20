const jwt = require("jsonwebtoken");
require("dotenv").config();


const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '12h'});
    return token;
}

const verifyToken = (token, next) => {
    try {
        const {userId} = jwt.verify(token, process.env.JWT_SECRET);
        return userId;
    } catch (error) {
        next(error);
    }
}

module.exports = {createToken, verifyToken};