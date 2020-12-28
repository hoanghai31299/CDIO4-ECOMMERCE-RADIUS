const express = require("express");
const route = express.Router();
const { create, update, deleteOrder, getAll, getOrder } = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

route.post("/create", authController.isSignIn, create);
route.put("/:id", authController.isSignIn, authController.isAdmin, update);
route.delete("/:id", authController.isSignIn, authController.isAdmin, deleteOrder);
route.get("/", authController.isSignIn, authController.isAdmin, getAll);
route.get("/:id", authController.isSignIn, authController.isAdmin, getOrder);

module.exports = route