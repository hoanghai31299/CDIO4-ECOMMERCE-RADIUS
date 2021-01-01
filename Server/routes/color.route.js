const { createColor, updateColor, deleteColor, getAll, getColor } = require("../controllers/color.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.post("/create", authController.isSignIn, authController.isEditor, createColor);
route.put("/:id", authController.isSignIn, authController.isEditor, updateColor);
route.delete("/:id", authController.isSignIn, authController.isEditor, deleteColor);
route.get("/", getAll);
route.get("/:id", authController.isSignIn, authController.isEditor, getColor);

module.exports = route