const sendResponse = (res, statusCode, message, data = null, errors = []) => {
  return res.status(statusCode).send({
    statusCode,
    message,
    data: data || undefined,
    errors: errors.length ? errors : undefined
  });
};

// Utility functions for different HTTP responses
const successResponse = (res, message, data = null) => {
  return sendResponse(res, 200, message, data);
};

const createdResponse = (res, message, data = null) => {
  return sendResponse(res, 201, message, data);
};

const badRequestResponse = (res, message, errors = []) => {
  return sendResponse(res, 400, message, null, errors);
};

const unauthorizedResponse = (res, message = "Unauthorized user!") => {
  return sendResponse(res, 401, message);
};

const notFoundResponse = (res, message = "Resources not found.") => {
  return sendResponse(res, 404, message);
};
const serverErrorResponse = (res, message = "Internal server errror.") => {
  return sendResponse(res, 500, message);
};
module.exports = {
  sendResponse,
  successResponse,
  createdResponse,
  badRequestResponse,
  unauthorizedResponse,
  notFoundResponse,
  serverErrorResponse,
};
