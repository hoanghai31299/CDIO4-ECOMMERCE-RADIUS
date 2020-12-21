const { signin, signup, signout, refreshToken } = require("../controllers/auth.controller");

const express = require("express");
const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/signout", signout);
route.post("/refresh_token", refreshToken);


module.exports = route