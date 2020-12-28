const { create, update, deleteNotification, getAll, getNotification } = require("../controllers/notification.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.post("/create", authController.isSignIn, authController.isEditor, create);
route.put("/:id", authController.isSignIn, authController.isEditor, update);
route.delete("/:id", authController.isSignIn, authController.isEditor, deleteNotification);
route.get("/", authController.isSignIn, authController.isEditor, getAll);
route.get("/:id", authController.isSignIn, authController.isEditor, getNotification);

module.exports = route