const { Response } = require("../utils/response");

class BookReviewController {
    register(app) {
        app.route("/books")
            .get((req, res, next) => {
                try {
                    // Pending task
                    return Response.success(res, 'Book list', ['book1', 'book2']);
                } catch (error) {
                    next(error);
                }
            });
    }
}
module.exports = BookReviewController;