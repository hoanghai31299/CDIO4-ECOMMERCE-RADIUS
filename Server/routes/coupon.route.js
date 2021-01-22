const {
  create,
  update,
  deleteCoupon,
  getAll,
  getCoupon,
} = require("../controllers/coupon.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.post("/create", authController.isSignIn, authController.isEditor, create);
route.put("/:id", authController.isSignIn, authController.isEditor, update);
route.delete(
  "/:id",
  authController.isSignIn,
  authController.isEditor,
  deleteCoupon
);
route.get("/", authController.isSignIn, authController.isEditor, getAll);
route.get("/:id", authController.isSignIn, getCoupon);

module.exports = route;
