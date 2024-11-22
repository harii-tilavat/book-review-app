const { authMiddleware } = require("../middlewares/authMiddlerware");
const upload = require("../middlewares/uploadMiddlerware");
const { validationHandler } = require("../middlewares/validation");
const { bookValidSchema } = require("../middlewares/validation/bookReviewValidation");
const BookReviewService = require("../services/bookReviewService");
const { Response, Message } = require("../utils/response");

class BookReviewController {
    constructor() {
        this.bookReviewService = new BookReviewService();
    }
    register(app) {
        app.route("/books")
            .get(async (req, res, next) => {
                try {
                    // Pending task
                    return Response.success(res, 'Book list', ['book1', 'book2']);
                } catch (error) {
                    next(error);
                }
            })
            .post(authMiddleware, upload.single('file'), bookValidSchema, validationHandler, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const book = await this.bookReviewService.createBook({ userId, ...req.body, file: req.file });
                    return Response.success(res, Message.BOOK_CREATED, book);
                } catch (error) {
                    console.log("FILE : ", req.file);
                    next(error);
                }
            })
    }
}
module.exports = BookReviewController;