const { Message, StatusCode } = require("../utils/response");

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
    } else if (err.message && err.message.includes("Can't reach database server")) {
        // Handle database connection issues
        statusCode = 503; // Service Unavailable
        message = "Unable to connect to the database. Please ensure the database server is running.";
        errors = [{ issue: "Database connection error" }];

    } else if ((err?.message || "").includes("prisma")) {
        message = Message.INTERNAL_SERVER_ERROR;
    }
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        message: message || 'Internal server error!',
        errors: errors || [],
        errorCode: err.code || undefined
    });
};
module.exports = { AppError, errorHandlerMiddleware };