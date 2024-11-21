const { body } = require("express-validator");

const userValidationSchema = [
    body("email").notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email!"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    // Other validation
];

const userLoginValidationSchema = [...userValidationSchema];
const userRegisterValidationSchema = [
    body("username").notEmpty().withMessage("Username is required."),
    ...userValidationSchema
];

module.exports = {
    userLoginValidationSchema,
    userRegisterValidationSchema
}