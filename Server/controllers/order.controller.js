const express = require("express");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");

exports.stats = async (req, res, next) => {
  try {
    const { start, end } = req.body;
    const orders = await Order.find({
      createdAt: { $gte: new Date(start), $lt: new Date(end) },
    });
    res.json({
      orders,
    });
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const { address, name, phone, products, couponCode, userId } = req.body;
    if (!(address, name, phone, products, userId)) {
      return res.status(400).json({
        error: true,
        message: "all fill is required",
      });
    }
    if (!(products && products.length > 0)) {
      return res.status(400).json({
        error: true,
        message: "order item is not found",
      });
    }
    const idArray = products.map((item) => item.productId);
    const orderItem = await Product.find({ _id: { $in: idArray } });
    for (let i = 0; i < orderItem.length; i++) {
      let find = orderItem[i].colors.find((prod) => {
        return prod.color._id + "" == products[i].colorId + "";
      });
      if (
        orderItem[i].quantity === 0 ||
        find.quantity === 0 ||
        products[i].quantity === 0
      ) {
        return res.status(400).json({
          error: true,
          message:
            "Product " +
            orderItem[i].name +
            " with color " +
            find.color._id +
            "out of stock",
        });
      }
      if (
        orderItem[i].quantity < products[i].quantity ||
        products[i].quantity > find.quantity
      ) {
        return res.status(400).json({
          error: true,
          message:
            "The number of ordered products " +
            orderItem[i].name +
            " with color " +
            find.color._id +
            " is greater than the quantity of the stock",
        });
      }
    }

    const total = orderItem.reduce((pre, prod) => {
      return (
        pre +
        prod.price * products.find((prd) => prd.productId == prod._id).quantity
      );
    }, 0);
    let lastTotal = total;
    let newOrder = {
      address,
      name,
      phone,
      products,
      userId,
      total,
      lastTotal,
    };
    if (couponCode) {
      const discount = await Coupon.findOne({ code: couponCode });
      if (!discount) {
        return res.status(400).json({
          error: true,
          message: "coupon is not found",
        });
      }
      const now = new Date().getTime();
      const discountBegin = discount.begin.getTime();
      const discountEnd = discount.end.getTime();
      if (now < discountBegin || now > discountEnd) {
        return res.status(400).json({
          error: true,
          message: "coupon is over time",
        });
      }
      if (discount.min > total) {
        return res.status(400).json({
          error: true,
          message: "coupon is invalid",
        });
      }
      let discountRate = total * (1 - discount.discount);
      if (total * (1 - discount.discount) > discount.max) {
        discountRate = discount.max;
      }
      lastTotal = total - discountRate;
      newOrder.coupon = discount._id;
      newOrder.lastTotal = lastTotal;
    }

    const order = new Order(newOrder);
    await order.save();

    let query = products.map((item) => {
      return {
        updateOne: {
          filter: {
            _id: item.productId,
            "colors.color": item.colorId,
          },
          update: {
            $inc: {
              "colors.$.quantity": -item.quantity,
              "$.sold": +item.quantity,
              quantity: -item.quantity,
              sold: +item.quantity,
            },
          },
        },
      };
    });
    await Product.bulkWrite(query);
    return res.status(200).json({
      error: false,
      message: "create order successful",
      order,
    });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const {
      address,
      name,
      phone,
      products,
      couponCode,
      userId,
      status,
      shipDate,
    } = req.body;
    if (!(address, name, phone, products)) {
      return res.status(400).json({
        error: true,
        message: "all fill is required",
      });
    }
    const _id = req.params.id;
    if (!(products && products.length > 0)) {
      return res.status(400).json({
        error: true,
        message: "order item is not found",
      });
    }
    const idArray = products.map((item) => item.productId);
    const orderItem = await Product.find({ _id: { $in: idArray } });
    for (let i = 0; i < orderItem.length; i++) {
      let find = orderItem[i].colors.find((prod) => {
        return prod.color._id + "" == products[i].colorId + "";
      });
      if (
        orderItem[i].quantity === 0 ||
        find.quantity === 0 ||
        products[i].quantity === 0
      ) {
        return res.status(400).json({
          error: true,
          message:
            "Product " +
            orderItem[i].name +
            " with color " +
            find.color._id +
            "out of stock",
        });
      }
      if (
        orderItem[i].quantity < products[i].quantity ||
        products[i].quantity > find.quantity
      ) {
        return res.status(400).json({
          error: true,
          message:
            "The number of ordered products " +
            orderItem[i].name +
            " with color " +
            find.color._id +
            " is greater than the quantity of the stock",
        });
      }
    }
    const total = orderItem.reduce((pre, prod) => {
      return (
        pre +
        prod.price * products.find((prd) => prd.productId == prod._id).quantity
      );
    }, 0);
    let lastTotal = total;
    let newOrder = {
      address,
      name,
      phone,
      products,
      userId,
      total,
      lastTotal,
      status,
      shipDate,
    };
    if (couponCode) {
      const discount = await Coupon.findOne({ code: couponCode });
      if (!discount) {
        return res.status(400).json({
          error: true,
          message: "coupon is not found",
        });
      }
      const now = new Date().getTime();
      const discountBegin = discount.begin.getTime();
      const discountEnd = discount.end.getTime();
      if (now < discountBegin || now > discountEnd) {
        return res.status(400).json({
          error: true,
          message: "coupon is not found",
        });
      }
      if (discount.min > total) {
        return res.status(400).json({
          error: true,
          message: "coupon is invalid",
        });
      }
      let discountRate = total * (1 - discount.discount);
      if (total * (1 - discount.discount) > discount.max) {
        discountRate = discount.max;
      }
      lastTotal = total - discountRate;
      newOrder.coupon = discount._id;
      newOrder.lastTotal = lastTotal;
    }

    const order = await Order.findByIdAndUpdate(
      _id,
      { $set: { newOrder } },
      { new: true }
    );

    let query = products.map((item) => {
      return {
        updateOne: {
          filter: {
            _id: item.productId,
            "colors.color": item.colorId,
          },
          update: {
            $inc: {
              "colors.$.quantity": -item.quantity,
              "$.sold": +item.quantity,
              quantity: -item.quantity,
              sold: +item.quantity,
            },
          },
        },
      };
    });
    await Product.bulkWrite(query);
    return res.status(200).json({
      error: false,
      message: "update order successful",
      order,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteOrder = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const order = await Order.findByIdAndUpdate(_id, {
      $set: { deleteAt: new Date() },
    });
    if (!order) {
      return res.status(400).json({
        error: true,
        message: "order is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "delete order successful",
    });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const order = await Order.find({ deleteAt: undefined });
    return res.status(200).json({
      error: false,
      message: "get all order successful",
      order,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrder = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(400).json({
        error: true,
        message: "order is not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "get order successful",
      order,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrderByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({userId})
                  .populate({path: "products.productId"})
                  .populate({path: "products.colorId"})
                  .populate({path: "userId"})
    return res.status(200).json({
      error: false,
      message: "get order by user successful",
      orders
    })
  } catch (error) {
    next(error)
  }
}
