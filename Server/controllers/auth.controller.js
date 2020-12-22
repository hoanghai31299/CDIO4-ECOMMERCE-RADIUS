const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.signup = async(req, res, next) => {
    try {
        const { name, email, phone, address, password } = req.body;
        const userParams = {
            name,
            email,
            phone,
            address,
            password: bcrypt.hashSync(password, 10)
        };
        const userMail = await User.findOne({ email });
        if (userMail)
            return res.status(400).json({
                error: true,
                message: "Email already signup"
            })
        const newUser = new User(userParams);
        await newUser.save();
        return res.status(200).json({
            error: false,
            message: "Signup successfull"
        })
    } catch (err) {
        next(err)
    }
}
exports.signin = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                error: true,
                message: "email or password is required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Email does not exist"
            })
        }
        if (bcrypt.compareSync(user.password, password)) {
            return res.status(400).json({
                error: true,
                message: "Password and email are not match"
            })
        }
        const token = await jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });
        const refreshToken = await jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
        res.cookie("token", token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
        res.cookie("refreshToken", refreshToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });
        return res.status(400).json({
            error: false,
            token,
            refreshToken,
            user
        })
    } catch (err) {
        next(err)
    }

}
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshtoken");
    res.status(400).json({
        error: false,
        message: "Signout success"
    })
}
exports.refreshToken = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                error: true,
                message: "Refresh token is not valied"
            })
        }
        const newUser = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        const newToken = await jwt.sign({ newUser }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1d' });
        res.cookie("token", newToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
        res.status(200).json({
            error: false,
            message: "Refresh token successfull",
            newToken
        })
    } catch (error) {
        next(error)
    }
}