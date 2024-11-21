const { validationResult } = require("express-validator");
const { badRequestResponse } = require("../../utils/response");
const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badRequestResponse(res, "Validation failed: Missing or invalid parameters.", errors.array().map(error => `${error.msg}`));
    }
    return next();
}
module.exports = validationHandler;