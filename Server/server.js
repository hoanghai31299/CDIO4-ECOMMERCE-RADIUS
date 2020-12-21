//import
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const { mongoose, connectDB } = require("./models");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

//config
const port = process.env.PORT || 5000;
//database
connectDB();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const headers = {
    origin: "*",
    credentials: true,
    method: "GET,POST,PUT,PATCH,DELETE,HEAD",
};
app.use(cors(headers));
//route
app.get("/", (req, res, next) => {
    return res.send("hello");
});
app.use((err, req, res, next) => {
    if (err)
        return res.status(500).json({
            error: true,
            message: err.message
        })
})
app.use("/auth", authRoute);
app.use("/user", userRoute);

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});