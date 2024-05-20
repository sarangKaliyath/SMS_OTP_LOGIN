const express = require("express");
const {registerUser} = require("../controller/auth.controller");

const Router = express.Router();

Router.post("/register", registerUser);

module.exports = Router;

