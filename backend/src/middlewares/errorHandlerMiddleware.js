// errorHandler.js (in a utils folder or similar)
class AppError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.message = message || "Something went wrong!";
    }
}


const errorHandlerMiddleware = (err, req, res, next) => {
    const { statusCode, message, errors } = err;
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        message: message || 'Internal server error!',
        errors: errors || [],
    });
};
module.exports = { AppError, errorHandlerMiddleware };