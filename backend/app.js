require("dotenv").config();
const express = require("express");
const router = require("./routes/index.routes");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan")("dev");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/static/cd-games", express.static("public"));

app.use(morgan);
app.use(router);

module.exports = app;
