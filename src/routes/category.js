const express = require("express");

const Router = express.Router();
const categoryController = require("../controllers/category");

Router.post("/create", categoryController.createCategory);

module.exports = Router;
