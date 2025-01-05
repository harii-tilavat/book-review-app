const express = require("express");
const router = express.Router();

// Import controllers
const ConfigController = require("../controllers/configController");
const BookController = require("../controllers/bookController");
const ReviewController = require("../controllers/reviewController");
const DraftController = require("../controllers/draftController");

// Set up routes for config (auth)
const configController = new ConfigController();
configController.register(router);

// Set up routes for books 
const bookController = new BookController();
bookController.register(router);

// Set up routes for reviews
const reviewController = new ReviewController();
reviewController.register(router);

// Set up routes for drafts
const draftController = new DraftController();
draftController.register(router);


module.exports = router;