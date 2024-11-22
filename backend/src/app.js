const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { errorHandlerMiddleware } = require("./middlewares/errorHandlerMiddleware");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));


// Centralized routes under /api
app.use("/api", routes); // Prefix API routes with '/api'

// Global Error Handler
app.use(errorHandlerMiddleware);

module.exports = app;
