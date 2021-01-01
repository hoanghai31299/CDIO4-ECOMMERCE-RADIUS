const express = require("express");
const route = express.Router();
const {
  create,
  update,
  deleteProduct,
  getAll,
  getProduct,
} = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const { uploads } = require("../utils/multer");
route.post("/create", uploads.single("productImage"), create);
route.put("/:id", update);
route.delete("/:id", deleteProduct);
route.get("/", getAll);
route.get("/:id", getProduct);

module.exports = route;
