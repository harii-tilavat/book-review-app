const express = require("express");
const router = express.Router();

// Import controllers
const ConfigController = require("../controllers/configController");
const BookReviewController = require("../controllers/bookReviewController");

// Set up routes for config (auth)
const configController = new ConfigController();
configController.register(router);

// Set up routes for books and reviews
const bookReviewController = new BookReviewController();
bookReviewController.register(router);


module.exports = router;