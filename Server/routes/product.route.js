const express = require("express");
const route = express.Router();
const {
  create,
  update,
  deleteProduct,
  getAll,
  getProduct,
  addColor,
  upImage,
} = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const { uploads } = require("../utils/multer");

route.post("/create", create);
route.put("/:id", update);
route.delete("/:id", deleteProduct);
route.get("/", getAll);
route.get("/:id", getProduct);
route.post("/add_color/:id", addColor);
route.post("/up_image", uploads.single("productImage"), upImage);

module.exports = route;
