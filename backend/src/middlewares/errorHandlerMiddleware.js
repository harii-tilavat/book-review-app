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
    let { statusCode, message, errors } = err;

    // Handle Prisma-specific errors
    if (err.code === "P2003") {
        statusCode = 400; // Bad Request
        message = "Foreign key constraint violated: The specified user or book does not exist.";
        errors = [{ field: "userId or bookId", issue: "Invalid reference" }];
    }
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        message: message || 'Internal server error!',
        errors: errors || [],
        errorCode: err.code || undefined
    });
};
module.exports = { AppError, errorHandlerMiddleware };