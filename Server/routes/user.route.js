const { getUser, updateUser, deleteUser, resetPassword, getAll, createUser, updateUserByAdmin } = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.get("/:_id", authController.isSignIn, getUser);
route.put("/:_id", authController.isSignIn, updateUser);
route.delete("/:_id", authController.isSignIn, authController.isEditor, deleteUser);
route.post("/reset_password", authController.isSignIn, resetPassword);
route.put("/update_by_admin/:_id", authController.isSignIn, authController.isEditor, updateUserByAdmin);
route.post("/create", authController.isSignIn, authController.isEditor, createUser);
route.get("/", authController.isSignIn, authController.isEditor, getAll);

module.exports = route