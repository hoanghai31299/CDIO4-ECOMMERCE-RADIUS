const express = require("express");
const Color = require("../models/color.model");

exports.createColor = async(req, res, next) => {
    try {
        const { name, hex } = req.body;
        const colorName = await Color.findOne({ name });
        if (colorName) {
            return res.status(400).json({
                error: true,
                message: "color name is unique"
            })
        }
        const colorHex = await Color.findOne({ hex });
        if (colorHex) {
            return res.status(400).json({
                error: true,
                message: "hex color is unique"
            })
        }
        const newColor = new Color({ name, hex });
        await newColor.save();
        return res.status(200).json({
            error: false,
            message: "create color successful",
            color: newColor
        })
    } catch (error) {
        next(error)
    }
}
exports.updateColor = async(req, res, next) => {
    try {
        const { name, hex } = req.body;
        const _id = req.params.id;
        const color = await Color.findByIdAndUpdate(_id, { $set: { name, hex } }, { new: true });
        if (!color) {
            return res.status(400).json({
                error: true,
                message: "id color is not exists"
            })
        }
        return res.status(200).json({
            error: false,
            message: "update color successful",
            color
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteColor = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const color = await Color.findByIdAndUpdate(_id, { $set: { deleteAt: new Date() } });
        if (!color) {
            return res.status(400).json({
                error: true,
                message: "color is not exists"
            })
        }
        return res.status(200).json({
            error: false,
            message: " delete color successful"
        })
    } catch (error) {
        next(error)
    }
}
exports.getAll = async(req, res, next) => {
    try {
        const color = await Color.find({ deleteAt: undefined });
        return res.status(200).json({
            error: false,
            message: "get all color successful",
            color
        })
    } catch (error) {
        next(error)
    }
}
exports.getColor = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const color = await Color.findById(_id);
        if (!color) {
            return res.status(400).json({
                error: true,
                message: "color is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "get color successful",
            color
        })
    } catch (error) {
        next(error)
    }
}