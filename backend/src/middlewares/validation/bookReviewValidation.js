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

    body("genreId")
        .trim()
        .notEmpty()
        .withMessage("GenreId is required."),
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
        .withMessage("Rating is required.")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating should in between 1 to 5.")

]
module.exports = { bookValidSchema, reviewValidSchema }