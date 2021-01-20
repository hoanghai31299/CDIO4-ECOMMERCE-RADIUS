const express = require("express");
const Category = require("../models/category.model");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        error: true,
        message: "name color is required",
      });
    }
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(200).json({
        error: true,
        message: "name category is unique",
      });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    return res.status(200).json({
      error: false,
      message: "create successful",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(200).json({
        error: true,
        message: "name is required",
      });
    }
    const _id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      _id,
      { $set: { name } },
      { new: true }
    );
    if (!category) {
      return res.status(200).json({
        error: true,
        message: "id category is not exist",
      });
    }
    return res.status(200).json({
      error: false,
      message: "update category successful",
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndUpdate(_id, {
      $set: { deleteAt: new Date() },
    });
    if (!category) {
      return res.status(200).json({
        error: true,
        message: "Category is not exist",
      });
    }
    return res.status(200).json({
      error: false,
      message: "delete category successful",
    });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const category = await Category.find({ deleteAt: undefined });
    return res.status(200).json({
      error: false,
      message: "get all category successful",
      category,
    });
  } catch (error) {
    next(error);
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(200).json({
        error: true,
        message: "category is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get category successful",
      category,
    });
  } catch (error) {
    next(error);
  }
};
