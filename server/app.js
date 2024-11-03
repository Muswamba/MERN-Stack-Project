const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
// connect to mongodb
mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.log(err));

// exports app
module.exports = app;