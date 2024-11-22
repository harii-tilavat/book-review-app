const { body } = require("express-validator");

const bookValidSchema = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required."),
    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required."),

    body("genre")
        .trim()
        .notEmpty()
        .withMessage("Genre is required."),
];

const reviewValidSchema = [
    body("bookId")
        .trim()
        .notEmpty()
        .withMessage("BookId is required."),
    body("text")
        .trim()
        .notEmpty()
        .withMessage("Text is required."),
    body("rating")
        .notEmpty()
        .withMessage("Rating is required."),
]
module.exports = { bookValidSchema, reviewValidSchema }