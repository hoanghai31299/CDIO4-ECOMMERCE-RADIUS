const express = require("express");
const Coupon = require("../models/coupon.model");

exports.create = async(req, res, next) => {
    try {
        const { title, description, code, begin, end, discount } = req.body;
        const couponCode = await Coupon.findOne({ code });
        if (couponCode) {
            return res.status(400).json({
                error: true,
                message: "code coupon is unique"
            })
        }
        const coupon = new Coupon({
            title,
            description,
            code,
            begin,
            end,
            discount
        });
        await coupon.save()
        return res.status(200).json({
            error: false,
            message: "create coupon successful",
            coupon
        })
    } catch (error) {
        next(error)
    }
}
exports.update = async(req, res, next) => {
    try {
        const { title, description, code, begin, end, discount } = req.body;
        const _id = req.params.id;
        const coupon = await Coupon.findByIdAndUpdate(_id, {
            $set: {
                title,
                description,
                code,
                begin,
                end,
                discount
            }
        }, { new: true });
        if (!coupon) {
            return res.status(400).json({
                error: true,
                message: "coupon is not exists"
            })
        }
        return res.status(200).json({
            error: false,
            message: "update coupon successful",
            coupon
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteCoupon = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const coupon = await Coupon.findByIdAndUpdate(_id, { $set: { deleteAt: new Date() } });
        if (!coupon) {
            return res.status(400).json({
                error: true,
                message: "coupon is not exist"
            })
        }
        return res.status(200).json({
            error: false,
            message: "delete coupon successful"
        })
    } catch (error) {
        next(error)
    }
}
exports.getAll = async(req, res, next) => {
    try {
        const coupon = await Coupon.find({ deleteAt: undefined });
        return res.status(200).json({
            error: false,
            message: "get all coupon successful",
            coupon
        })
    } catch (error) {
        next(error)
    }
}
exports.getCoupon = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const coupon = await Coupon.findById(_id);
        if (!coupon) {
            return res.status(400).json({
                error: true,
                message: "coupon is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "get coupon successful",
            coupon
        })
    } catch (error) {
        next(error)
    }
}