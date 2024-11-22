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

module.exports = { bookValidSchema }