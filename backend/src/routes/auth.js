// const express = require("express");
// const router = express.Router();
// const { userLoginValidationSchema, userRegisterValidationSchema } = require("../middlewares/validation/userValidation");
// const { PrismaClient } = require("@prisma/client");
// const validationHandler = require("../middlewares/validation/validationHandler");
// const { badRequestResponse } = require("../utils/response");
// const { AppError } = require("../middlewares/errorHandler");

// const prisma = new PrismaClient();
// // Route: Register a new user
// router.post("/login", (req, res) => {
//     res.send({ message: "User login endpoint." });
// });

// // Route: Login a user
// router.post("/register", userRegisterValidationSchema, validationHandler, (req, res, next) => {
//     try {
//         res.send({ message: "User registration" });
//         // next();
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = router;
