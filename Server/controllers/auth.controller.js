const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendMail, verifyEmailTemplate, forgotPasswordTemplate } = require("../helpers/verifyEmail");

exports.signup = async(req, res, next) => {
    try {
        const { name, email, phone, address, password } = req.body;
        if (!(name && email && phone && address && password)) {
            return res.status(400).json({
                error: true,
                message: "all fill is required"
            })
        }
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
        const user = new User(userParams)
        const token = await jwt.sign({ user }, process.env.JWT_VERIFY_MAIL_TOKEN, { expiresIn: "10m" });
        let verifylink = `http:\/\/${req.headers.host}\/auth\/verify\/${token}`;
        await sendMail({
            from: "RADIUS-E STORE",
            to: email,
            subject: "VERIFY EMAIL",
            html: verifyEmailTemplate(verifylink),
        });
        return res.status(200).json({
            error: false,
            message: `Signup successfull, Email has been send to ${email}`
        })
    } catch (err) {
        next(err)
    }
}

exports.verifyEmail = async(req, res, next) => {
    try {
        const token = req.params.token;
        const { user } = await jwt.verify(token, process.env.JWT_VERIFY_MAIL_TOKEN);
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "token is not found"
            })
        }
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({
            error: false,
            message: "signup successful",
            newUser
        })
    } catch (error) {
        next(error)
    }
};

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
        if (!bcrypt.compareSync(password, user.password)) {
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
exports.isSignIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!req.cookies) {
        return res.status(400).json({
            message: "Unauthorized, access denied"
        })
    }
    if (!token) {
        return res.status(400).json({
            message: "Unauthorized, access denied"
        })
    }
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.status(400).json({
                message: "Token is not valid, access denied"
            })
        }
        req.user = decode.user;
        next();
    });
}
exports.isAdmin = (req, res, next) => {
    const isAdmin = req.user.role == 2;
    if (!isAdmin) {
        return res.status(400).json({
            message: "You are not Admin, access denied",
        });
    }
    next();
}
exports.isEditor = (req, res, next) => {
    const isEditor = req.user.role >= 1;
    if (!isEditor) {
        return res.status(400).json({
            message: "You are not editor, access denied",
        });
    }
    next();
}
exports.verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const user = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = user;
            next();
        }
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                message: "signin plsss"
            })
        }
        const user = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        const newToken = await jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });
        res.cookie("token", newToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
        next();
    } catch (error) {
        next(error)
    }
}