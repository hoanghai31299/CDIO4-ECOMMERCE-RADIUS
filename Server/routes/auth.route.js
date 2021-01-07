const {
  signin,
  signup,
  signout,
  refreshToken,
  verifyEmail,
  signinByCookie,
} = require("../controllers/auth.controller");
const authController = require("../controllers/auth.controller");

const express = require("express");
const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/verify/:token", verifyEmail);
route.get("/signout", authController.isSignIn, signout);
route.post("/refresh_token", refreshToken);
route.get("/signinW", signinByCookie);

module.exports = route;
