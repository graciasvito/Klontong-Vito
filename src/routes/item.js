const express = require("express");

const Router = express.Router();

const itemController = require("../controllers/item");

Router.get("/", itemController.getAllItem);
Router.post("/create", itemController.createItem);

module.exports = Router;
