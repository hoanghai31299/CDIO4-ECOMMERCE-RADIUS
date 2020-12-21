const { getUser, updateUser, deleteUser, resetPassword } = require("../controllers/user.controller");
const express = require("express");
const route = express.Router();

route.get("/:_id", getUser);
route.put("/:_id", updateUser);
route.delete("/:_id", deleteUser);
route.post("/reset_password", resetPassword);

module.exports = route