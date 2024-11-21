class Response {
  static send(res, statusCode, message, data = null) {
      return res.status(statusCode).send({
          statusCode,
          message,
          data: data || undefined,
      });
  }

  static success(res, message, data = null) {
      return this.send(res, 200, message, data);
  }

  static created(res, message, data = null) {
      return this.send(res, 201, message, data);
  }

  static badRequest(res, message) {
      return this.send(res, 400, message);
  }

  static unauthorized(res, message = "Unauthorized user!") {
      return this.send(res, 401, message);
  }

  static notFound(res, message = "Resources not found.") {
      return this.send(res, 404, message);
  }

  static serverError(res, message = "Internal server error.") {
      return this.send(res, 500, message);
  }
}

module.exports = Response;
