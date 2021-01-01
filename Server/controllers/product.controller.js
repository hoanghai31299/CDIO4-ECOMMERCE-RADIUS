const express = require("express");
const mongoose = require("mongoose");
const { uploadSingle, dataUri } = require("../utils/cloudinary");
const fs = require("fs");
const Product = require("../models/product.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    const data = JSON.parse(queryStr);
    if (data.name) {
      data.name["$options"] = "i";
    }
    this.query.find(data);

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
exports.create = async (req, res, next) => {
  try {
    const { name, price, description, colors, categories } = req.body;
    if (!(name, price, colors, categories)) {
      return res.status(200).json({
        error: true,
        message: "all fell is required",
      });
    }

    // if (req.file) {
    //     const file = dataUri(req.file).content;
    //     const imgCloudinary = await uploadSingle(file);
    //     colors.image_url = imgCloudinary.url;
    // }
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
    if (!(name, price, colors, categories)) {
      return res.status(200).json({
        error: true,
        message: "all fell is required",
      });
    }
    const { main, size, sku } = description;
    const _id = req.params.id;
    // if (req.file) {
    //     const file = dataUri(req.file).content;
    //     const imgCloudinary = await uploadSingle(file);
    //     colors.image_url = imgCloudinary.url;
    // }
    // const colorCollection = [colors];
    const productParams = {
      name,
      price,
      description: {
        main,
        size,
        sku,
      },
      colors,
      categories,
    };
    const product = await Product.findByIdAndUpdate(
      _id,
      { $set: { productParams } },
      { new: true }
    );
    if (!product) {
      return res.status(200).json({
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
      return res.status(200).json({
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
    const features = new APIfeatures(
      Product.find({ deleteAt: undefined })
        .populate({
          path: "colors.color",
        })
        .populate({
          path: "categories",
        }),
      req.query
    )
      .filtering()
      .sorting();
    const total = await features.query;
    const products = await features.paginating().query;
    return res.status(200).json({
      products,
      query: {
        total: total.length,
        limit: req.query.limit || 20,
        page: req.query.page || 1,
      },
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
      return res.status(200).json({
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
exports.filter = async (req, res, next) => {
  try {
    const query = req.params;
  } catch (error) {
    next(error);
  }
};
exports.addColor = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { color, image_url, quantity } = req.body;
    if (!(color, image_url, quantity)) {
      return res.status(200).json({
        error: true,
        message: "all fell is required",
      });
    }
    const colors = {
      color,
      image_url,
      quantity,
    };
    const newProduct = await Product.findByIdAndUpdate(
      _id,
      { $push: { colors } },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      message: "add color successful",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};
exports.upImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(200).json({
        error: true,
        message: "file is required",
        files: req.files,
      });
    }
    const file = dataUri(req.file).content;
    let imgCloudinary = await uploadSingle(file);
    image_url = imgCloudinary.url;
    return res.status(200).json({
      error: false,
      message: "up image successful",
      image_url,
    });
  } catch (error) {
    next(error);
  }
};
