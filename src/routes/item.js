const express = require("express");

const Router = express.Router();

const itemController = require("../controllers/item");

Router.get("/", itemController.getAllItem);
Router.post("/create", itemController.createItem);
Router.get("/:id", itemController.getItemById);

module.exports = Router;
