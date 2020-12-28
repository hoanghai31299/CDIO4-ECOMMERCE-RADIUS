const express = require("express");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");

exports.create = async(req, res, next) => {
    try {
        const { address, name, phone, products, couponCode, userId } = req.body;
        if (!(products && product.length > 0)) {
            return res.status(400).json({
                error: true,
                message: "order item is not found"
            })
        }
        const idArray = product.map((item) => item.productId);
        const orderItem = await Product.find({ _id: { $in: idArray } });
        const discount = await Coupon.find({ code: couponCode });
        if (!(discount)) {
            return res.status(400).json({
                error: true,
                message: "coupon is not found"
            })
        }
        const now = new Date(getTime());
        const discountBegin = discount.begin.getTime();
        const discountEnd = discount.end.getTime();
        if (now < discountBegin || now > discountEnd) {
            return res.status(400).json({
                error: true,
                message: "coupon is not found"
            })
        }
        const total = orderItem.reduce((pre, prod) => {
            return pre + prod.price * products.find((prd) => prd.productId == prod._id).quantity
        }, 0);
        const lastTotal = total * (1 - discount);
        const newOrder = {
            address,
            name,
            phone,
            products,
            coupon: discount._id,
            userId,
            total,
            lastTotal
        }
        const order = new Order(newOrder);
        await order.save()
        return res.status(200).json({
            error: false,
            message: "create order successful",
            order
        })
    } catch (error) {
        next(error)
    }
}
exports.update = async(req, res, next) => {
    try {
        const { address, name, phone, products, couponCode, userId, status, shipDate } = req.body;
        const _id = req.params.id;
        if (!(products && product.length > 0)) {
            return res.status(400).json({
                error: true,
                message: "order item is not found"
            })
        }
        const idArray = product.map((item) => item.productId);
        const orderItem = await Product.find({ _id: { $in: idArray } });
        const discount = await Coupon.find({ code: couponCode });
        if (!(discount)) {
            return res.status(400).json({
                error: true,
                message: "coupon is not found"
            })
        }
        const now = new Date(getTime());
        const discountBegin = discount.begin.getTime();
        const discountEnd = discount.end.getTime();
        if (now < discountBegin || now > discountEnd) {
            return res.status(400).json({
                error: true,
                message: "coupon is not found"
            })
        }
        const total = orderItem.reduce((pre, prod) => {
            return pre + prod.price * products.find((prd) => prd.productId == prod._id).quantity
        }, 0);
        const lastTotal = total * (1 - discount);
        const orderParams = {
            address,
            name,
            phone,
            status,
            products,
            coupon: discount._id,
            userId,
            shipDate,
            total,
            lastTotal
        }
        const order = await Order.findByIdAndUpdate(_id, { $set: { orderParams } }, { new: true });
        if (!order) {
            return res.status(400).json({
                error: true,
                message: "order is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "update order successful",
            order
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteOrder = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const order = await Order.findByIdAndUpdate(_id, { $set: { deleteAt: new Date() } });
        if (!order) {
            return res.status(400).json({
                error: true,
                message: "order is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "delete order successful"
        })
    } catch (error) {
        next(error)
    }
}
exports.getAll = async(req, res, next) => {
    try {
        const order = await Order.find({ deleteAt: undefined });
        return res.status(200).json({
            error: false,
            message: "get all order successful",
            order
        })
    } catch (error) {
        next(error)
    }
}
exports.getOrder = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(400).json({
                error: true,
                message: "order is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "get order successful",
            order
        })
    } catch (error) {
        next(error)
    }
}