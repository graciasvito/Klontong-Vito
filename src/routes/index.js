const express = require("express");

const Router = express.Router();

const authRoutes = require("./auth");
const itemRoutes = require("./item");

Router.use("/auth", authRoutes);
Router.use("/item", itemRoutes);

module.exports = Router;
