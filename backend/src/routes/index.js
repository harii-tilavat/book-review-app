const express = require("express");
const router = express.Router();

// Import controllers
const ConfigController = require("../controllers/configController");
const BookController = require("../controllers/bookController");
const ReviewController = require("../controllers/reviewController");

// Set up routes for config (auth)
const configController = new ConfigController();
configController.register(router);

// Set up routes for books 
const bookController = new BookController();
bookController.register(router);

// Set up routes for reviews
const reviewController = new ReviewController();
reviewController.register(router);


module.exports = router;