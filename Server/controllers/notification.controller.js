const express = require("express");
const Notification = require("../models/notifications.model");

exports.create = async (req, res, next) => {
  try {
    const { title, information, users } = req.body;
    if (!(title, information, users)) {
      return res.status(400).json({
        error: true,
        message: "all fell is required",
      });
    }
    const notification = new Notification({ title, information, users });
    await notification.save();
    return res.status(200).json({
      error: false,
      message: "create notification successful",
      notification,
    });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { title, information, users } = req.body;
    if (!(title, information, users)) {
      return res.status(400).json({
        error: true,
        message: "all fell is required",
      });
    }
    const notification = await Notification.findByIdAndUpdate(
      _id,
      { $set: { title, information, users } },
      { new: true }
    );
    if (!notification) {
      return res.status(400).json({
        error: true,
        message: "notification is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "update notification successful",
      notification,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteNotification = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const notification = await Notification.findByIdAndUpdate(_id, {
      $set: { deleteAt: new Date() },
    });
    if (!notification) {
      return res.status(400).json({
        error: true,
        message: "notification is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "delete notification successful",
    });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const notification = await Notification.find({
      deleteAt: undefined,
    }).populate("users", "name _id");
    return res.status(200).json({
      error: false,
      message: "get all successful",
      notification,
    });
  } catch (error) {
    next(error);
  }
};
exports.getNotification = async (req, res, next) => {
  try {
    const user = req.user;
    const { _id } = user;
    const notification = await Notification.find({
      $or: [{ users: _id }, { users: [] }],deleteAt: undefined
    });
    if (!notification) {
      return res.status(400).json({
        error: true,
        message: "notification is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get notification successful",
      notification,
    });
  } catch (error) {
    next(error);
  }
};
