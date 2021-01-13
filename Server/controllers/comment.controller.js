const express = require("express");
const Comment = require("../models/comment.model");

exports.create = async(req, res, next) => {
    try {
        const { user_id, rate, content, product_id } = req.body;
        if (!(user_id, rate, content, product_id)) {
            return res.status(400).json({
                error: true,
                message: "all fill is required"
            })
        }
        const commentOld = await Comment.findOne({user_id, product_id});
        if(commentOld){
            return res.status(200).json({
                error: true,
                message: "you already commented"
            })
        }
        const comment = new Comment({ user_id, rate, content, product_id });
        await comment.save()
        return res.status(200).json({
            error: false,
            message: "create comment successful",
            comment
        })
    } catch (error) {
        next(error)
    }
}
exports.update = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const { user_id, rate, content, product_id } = req.body;
        if (!(user_id, rate, content, product_id)) {
            return res.status(400).json({
                error: true,
                message: "all fill is required"
            })
        }
        const commentParams = {
            user_id,
            rate,
            content,
            product_id
        }
        const comment = await Comment.findByIdAndUpdate(_id, { $set: commentParams }, { new: true });
        if (!comment) {
            return res.status(400).json({
                error: true,
                message: "comment is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "update comment successful",
            comment
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteComment = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const comment = await Comment.findByIdAndDelete(_id);
        if (!comment) {
            return res.status(400).json({
                error: true,
                message: "comment is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "delete comment successful"
        })
    } catch (error) {
        next(error)
    }
}
exports.getAllByProduct = async(req, res, next) => {
    try {
        const product_id = req.params.product_id;
        const comment = await Comment.find({ product_id })
                        .populate({path:"user_id"})
                        .populate({path:"product_id"})
        return res.status(200).json({
            error: false,
            message: "get all comment successful",
            comment
        })
    } catch (error) {
        next(error)
    }
}