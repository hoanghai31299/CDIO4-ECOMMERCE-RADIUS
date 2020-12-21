const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async(req, res, next) => {
    try {
        const _id = req.params;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User is not found"
            })
        }
        return res.status(200).json({
            error: false,
            message: "Get user successfull",
            user
        })
    } catch (err) {
        next(err);
    }
}
exports.updateUser = async(req, res, next) => {
    try {
        const _id = req.params;
        const { name, email, phone, address } = req.body;
        if (!_id) {
            return res.status(400).json({
                error: true,
                message: "User ID is not found"
            })
        }
        const newUser = await User.findById(_id);
        if (!newUser) {
            return res.status(400).json({
                error: true,
                message: "User is not found"
            })
        }
        if (!(name && email && address && phone)) {
            return res.status(400).json({
                error: true,
                message: "All fields are required "
            })
        }
        const userParams = {
            name,
            email,
            phone,
            address,
        }
        const lastuser = await User.findOneAndUpdate({ _id }, { $set: userParams }, {
            new: true
        });
        return res.status(200).json({
            error: false,
            message: "Update user succsessfull",
            user: lastuser
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteUser = async(req, res, next) => {
    try {
        const _id = req.params;
        if (!_id) {
            return res.status(400).json({
                error: true,
                message: "User Id is required"
            })
        }
        await User.findOneAndDelete({ _id });
        return res.status(200).json({
            error: false,
            message: "Delete user successfull"
        })
    } catch (error) {
        next(error)
    }
}
exports.resetPassword = async(req, res, next) => {
    try {
        const { newPassword, token } = req.body;
        if (!(token && newPassword)) {
            return res.status(400).json({
                error: true,
                message: " All fields are required "
            })
        }
        const user = await jwt.verify(token, process.env.JWT_RESET_PASSWORD_TOKEN);
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "token is invalid"
            })
        }
        newPassword = bcrypt.hashSync(newPassword, 10);
        const newUser = await User.findOneAndUpdate({ user }, {
            $set: {
                password: newPassword
            }
        });

    } catch (error) {
        next(error)
    }
}