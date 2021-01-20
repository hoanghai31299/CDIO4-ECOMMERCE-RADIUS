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
  getProductByCategory,
  setColors,
} = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const { uploads } = require("../utils/multer");

route.post("/create", authController.isSignIn, authController.isEditor, create);
route.put("/:id", authController.isSignIn, authController.isEditor, update);
route.delete(
  "/:id",
  authController.isSignIn,
  authController.isEditor,
  deleteProduct
);
route.get("/", getAll);
route.get("/get_category/:category", getProductByCategory);
route.get("/:id", getProduct);
route.post(
  "/add_color/:id",
  authController.isSignIn,
  authController.isEditor,
  addColor
);
route.post("/up_image", uploads.single("productImage"), upImage);
route.put(
  "/update_color/:id",
  authController.isSignIn,
  authController.isEditor,
  setColors
);

module.exports = route;
