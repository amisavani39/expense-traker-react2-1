const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

const transaction = require("./routes/transcation");

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transcation", transaction);

//app.get("/", (req, res) => res.send("Hello"));

//build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;


module.exports = app;