const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
const {errorHandler} = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));


// Centralized routes under /api
app.use("/api", routes); // Prefix API routes with '/api'

app.use(errorHandler);
// Global Error Handler
app.use((err, req, res, next) => {
  console.log("ERROR STACK : ", err.stack);
  res.status(500).json({ message: "An internal server error occurred!" });
});

module.exports = app;
