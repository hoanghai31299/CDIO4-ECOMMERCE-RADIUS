const express = require("express");
const route = express.Router();
const { create, update, deleteOrder, getAll, getOrder } = require("../controllers/order.controller");

route.post("/create", create);
route.put("/:id", update);
route.delete("/:id", deleteOrder);
route.get("/", getAll);
route.get("/:id", getOrder);

module.exports = route