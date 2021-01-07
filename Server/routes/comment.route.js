const { create, update, getAllByProduct, deleteComment } = require("../controllers/comment.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.post("/create", authController.isSignIn, create);
route.put("/:id", authController.isSignIn, update);
route.delete("/:id", authController.isSignIn, deleteComment);
route.get("/:product_id", getAllByProduct);

module.exports = route