//import
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { mongoose, connectDB } = require("./models");
//config
const port = process.env.PORT || 5000;
//database
connectDB();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

//listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
