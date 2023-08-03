const express = require("express");

const Router = express.Router();

const authRoutes = require("./auth");
const itemRoutes = require("./item");
const categoryRoutes = require("./category");

Router.use("/auth", authRoutes);
Router.use("/item", itemRoutes);
Router.use("/cat", categoryRoutes);

module.exports = Router;
