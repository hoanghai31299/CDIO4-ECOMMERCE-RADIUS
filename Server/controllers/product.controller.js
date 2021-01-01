const express = require("express");
const { uploadSingle, dataUri } = require("../utils/cloudinary");
const fs = require("fs");
const Product = require("../models/product.model");

exports.create = async (req, res, next) => {
  try {
    const { name, price, description, colors, categories } = req.body;
    if (req.file) {
      const file = dataUri(req.file).content;
      const imgCloudinary = await uploadSingle(file);
      colors.image_url = imgCloudinary.url;
    }
    const colorCollection = [colors];
    const productParams = {
      name,
      price,
      description,
      colors: colorCollection,
      categories,
    };
    const newProduct = new Product(productParams);
    await newProduct.save();
    return res.status(200).json({
      error: false,
      message: "create product successful",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { name, price, description, colors, categories } = req.body;
    const { main, size, sku } = description;
    const { color, image_url, quantity } = colors;
    const _id = req.params.id;
    const productParams = {
      name,
      price,
      description: {
        main,
        size,
        sku,
      },
      colors: {
        color,
        image_url,
        quantity,
      },
      categories,
    };
    const product = await Product.findByIdAndUpdate(
      _id,
      { $set: { productParams } },
      { new: true }
    );
    if (!product) {
      return res.status(400).json({
        error: true,
        message: "product is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "update product successful",
      product,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await Product.findByIdAndUpdate(_id, {
      $set: { deleteAt: new Date() },
    });
    if (!product) {
      return res.status(400).json({
        error: true,
        message: "product is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "delete product successful",
    });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const product = await Product.find({ deleteAt: undefined })
      .populate({
        path: "colors.color",
        select: "hex name -_id",
      })
      .exec();
    return res.status(200).json({
      error: false,
      message: "get all product successful",
      product,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({
        error: true,
        message: "product is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get product successful",
      product,
    });
  } catch (error) {
    next(error);
  }
};
