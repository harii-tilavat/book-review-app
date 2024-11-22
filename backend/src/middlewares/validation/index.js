const { validationResult } = require("express-validator");
const { AppError } = require("../errorHandlerMiddleware");
const { userLoginValidationSchema, userRegisterValidationSchema } = require("./userValidation");


const validationHandler = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return badRequestResponse(res, "Validation failed: Missing or invalid parameters.", errors.array().map(error => `${error.msg}`));
            throw new AppError(400, "Validation failed: Missing or invalid parameters.", errors.array().map(error => `${error.msg}`));
        }
        return next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validationHandler,
    userLoginValidationSchema,
    userRegisterValidationSchema
}