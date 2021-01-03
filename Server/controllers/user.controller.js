const express = require("express");
const User = require("../models/user.model");
const {
  sendMail,
  verifyEmailTemplate,
  forgotPasswordTemplate,
} = require("../helpers/verifyEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/user.model");

exports.getUser = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Get user successfull",
      user,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const { name, email, phone, address } = req.body;
    if (!(name, email)) {
      return res.status(400).json({
        error: true,
        message: "all fell is required",
      });
    }
    const newUser = await User.findById(_id);
    if (!newUser) {
      return res.status(400).json({
        error: true,
        message: "User is not found",
      });
    }
    if (!(name && email && address && phone)) {
      return res.status(400).json({
        error: true,
        message: "All fields are required ",
      });
    }
    const userParams = {
      name,
      email,
      phone,
      address,
    };
    const lastuser = await User.findOneAndUpdate(
      { _id },
      { $set: userParams },
      {
        new: true,
      }
    );
    return res.status(200).json({
      error: false,
      message: "Update user succsessfull",
      user: lastuser,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      return res.status(400).json({
        error: true,
        message: "User Id is required",
      });
    }
    await User.findOneAndUpdate({ _id }, { $set: { deleteAt: new Date() } });
    return res.status(200).json({
      error: false,
      message: "Delete user successfull",
    });
  } catch (error) {
    next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, token } = req.body;
    if (!(token && newPassword)) {
      return res.status(400).json({
        error: true,
        message: " All fields are required ",
      });
    }
    const user = await jwt.verify(token, process.env.JWT_RESET_PASSWORD_TOKEN);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "token is invalid",
      });
    }
    newPassword = bcrypt.hashSync(newPassword, 10);
    const newUser = await User.findOneAndUpdate(
      { user },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    if (!newUser) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "reset password successful",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateUserByAdmin = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const { name, email, phone, address, role } = req.body;
    if (!(name, email)) {
      return res.status(400).json({
        error: true,
        message: "all fell is required",
      });
    }
    if (!(name && email && address && phone)) {
      return res.status(400).json({
        error: true,
        message: "All fields are required ",
      });
    }
    const userParams = {
      name,
      email,
      phone,
      address,
      role,
    };
    const lastuser = await User.findByIdAndUpdate(
      _id,
      { $set: userParams },
      {
        new: true,
      }
    );
    return res.status(200).json({
      error: false,
      message: "Update user succsessfull",
      user: lastuser,
    });
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone, address, password, role } = req.body;
    if (!(name, email, password, address, role)) {
      return res.status(400).json({
        error: true,
        message: "all fell is required",
      });
    }
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return res.status(400).json({
        error: true,
        message: "email is already use",
      });
    }
    if (!(name && email && address && phone && password)) {
      return res.status(400).json({
        error: true,
        message: "All fields are required ",
      });
    }
    const userParams = {
      name,
      email,
      phone,
      role,
      address,
      password: bcrypt.hashSync(password, 10),
    };
    const user = await new User(userParams);
    user.save();
    return res.status(200).json({
      error: false,
      message: "create user succsessfull",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const user = await User.find({ deleteAt: undefined });
    return res.status(200).json({
      error: false,
      message: "get all user successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "email is not found",
      });
    }
    const token = await jwt.sign(
      { user },
      process.env.JWT_FORGOTPASSWORD_TOKEN,
      { expiresIn: "10m" }
    );
    const forgotLink = `http:\/\/${req.headers.host}\/user\/forgotPassword\/${token}`;
    const infor = await sendMail({
      from: "RADIUS-E STORE",
      to: email,
      subject: "FORGOT PASSWORD",
      html: forgotPasswordTemplate(forgotLink),
    });
    console.log(infor);
    return res.status(200).json({
      message: "The request has been resolved",
      data: infor,
    });
  } catch (error) {
    next(error);
  }
};
exports.addWishList = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        error: true,
      });
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { wishList: productId } },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "add wish lish successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteWishLish = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { productId } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { $pullAll: { wishList: [productId] } },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "delete wish lish successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.getWishLish = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get wish lish successful",
      wishList: user.wishList,
    });
  } catch (error) {
    next(error);
  }
};
exports.addToCart = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { productId, colorId } = req.body;
    const isUser = await User.findById(_id);
    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    const { cart } = await User.findById(_id, "cart");
    const current = cart.find(
      (item) => item.productId == productId && item.colorId == colorId
    );
    if (current) {
      current.quantity = current.quantity + 1;
    } else {
      cart.push({ productId, colorId, quantity: 1 });
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { cart } },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      message: "update cart successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateCart = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { newCart } = req.body;
    const isUser = await User.findById(_id);
    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { cart: newCart } },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      message: "update cart successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllCart = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const cart = await User.findById(_id);
    if (!cart) {
      return res.status(400).json({
        error: true,
        message: "user is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get all cart successful",
      cart: cart.cart,
    });
  } catch (error) {
    next(error);
  }
};
