const express = require("express");
const route = express.Router();
const { create, update, deleteProduct, getAll, getProduct } = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const multer = require("multer")
route.post("/create", create);
route.put("/:id", update);
route.delete("/:id", deleteProduct);
route.get("/", getAll);
route.get("/:id", getProduct);

module.exports = route