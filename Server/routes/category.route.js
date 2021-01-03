const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAll,
  getCategory,
} = require("../controllers/category.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.post(
  "/create",
  authController.isSignIn,
  authController.isEditor,
  createCategory
);
route.put(
  "/:id",
  authController.isSignIn,
  authController.isEditor,
  updateCategory
);
route.delete(
  "/:id",
  authController.isSignIn,
  authController.isEditor,
  deleteCategory
);
route.get("/", getAll);
route.get(
  "/:id",
  authController.isSignIn,
  authController.isEditor,
  getCategory
);

module.exports = route;
