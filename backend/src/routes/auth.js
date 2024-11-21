const express = require("express");
const router = express.Router();
const { userLoginValidationSchema, userRegisterValidationSchema } = require("../middlewares/validation/userValidation");
const { validationResult } = require("express-validator");
const validationHandler = require("../middlewares/validation/validationHandler");
// Route: Register a new user
router.post("/login", (req, res) => {
    res.send({ message: "User login endpoint." });
});

// Route: Login a user
router.post("/register", userRegisterValidationSchema, validationHandler, (req, res) => {

    res.send({ message: "User registration" });
});

function test(req, res, next) {
    console.log("MIDDLE WARE : ");
    next();
}
module.exports = router;
