const express = require("express");

require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routerNavigation = require("./src/routes"); // ./routes/index.js

const PORT = process.env.PORT;

app.use("/api", routerNavigation);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
