//import
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const { mongoose, connectDB } = require("./models");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const colorRoute = require("./routes/color.route");
const couponRoute = require("./routes/coupon.route");
const notificationRoute = require("./routes/notification.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");
const commentRoute = require("./routes/comment.route");

//config
const port = process.env.PORT || 5000;
//database
connectDB();
//middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
        limit: process.env.CLIENT_MAX_BODY_SIZE,
    })
);

app.use(cookieParser());
const headers = {
    origin: "http://localhost:3000",
    credentials: true,
    method: "GET,POST,PUT,PATCH,DELETE,HEAD",
};
app.use(cors(headers));
//route
app.get("/", (req, res, next) => {
    return res.send("hello");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/color", colorRoute);
app.use("/coupon", couponRoute);
app.use("/notification", notificationRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/comment", commentRoute);

app.use((err, req, res, next) => {
    if (err)
        return res.status(400).json({
            error: true,
            message: err.message,
        });
});

app.use((req, res, next) => {
        return res.json({
            error: true,
            message: "404 not found, check your URL"
        })
    })
    //listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});