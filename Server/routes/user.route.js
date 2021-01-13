const {
    getUser,
    updateUser,
    deleteUser,
    resetPassword,
    getAll,
    createUser,
    updateUserByAdmin,
    forgotPassword,
    addWishList,
    deleteWishLish,
    addToCart,
    updateCart,
    deleteCart,
    getAllCart,
    getWishLish,
    deleteAllWishList
} = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const route = express.Router();

route.get("/:_id", authController.isSignIn, getUser);
route.put("/:_id", authController.isSignIn, updateUser);
route.delete("/:_id", authController.isSignIn, authController.isEditor, deleteUser);
route.post("/reset_password", resetPassword);
route.put("/update_by_admin/:_id", authController.isSignIn, authController.isEditor, updateUserByAdmin);
route.post("/create", authController.isSignIn, authController.isEditor, createUser);
route.get("/", authController.isSignIn, authController.isEditor, getAll);
route.post("/forgot_password", forgotPassword);
route.post("/add_wish_list/:id", authController.isSignIn, addWishList);
route.delete("/delete_wish_list/:id", authController.isSignIn, deleteWishLish);
route.get("/get_wish_list/:id", authController.isSignIn, getWishLish);
route.delete("/delete_all_wish_list/:id", authController.isSignIn, deleteAllWishList);
route.post("/cart/:id", authController.isSignIn, addToCart);
route.put("/cart/:id", authController.isSignIn, updateCart);
route.get("/cart/:id", authController.isSignIn, getAllCart);


module.exports = route