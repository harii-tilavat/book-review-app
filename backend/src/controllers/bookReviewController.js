const { authMiddleware } = require("../middlewares/authMiddlerware");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const upload = require("../middlewares/uploadMiddlerware");
const { validationHandler } = require("../middlewares/validation");
const { bookValidSchema } = require("../middlewares/validation/bookReviewValidation");
const BookReviewService = require("../services/bookReviewService");
const { Response, Message, StatusCode } = require("../utils/response");

class BookReviewController {
    constructor() {
        this.bookReviewService = new BookReviewService();
    }
    register(app) {
        app.route("/books")
            .get(async (req, res, next) => {
                try {
                    const { itemsPerPage, page } = req.query;

                    const limit = parseInt(itemsPerPage);
                    const currentPage = parseInt(page);
                    // Validate query parameters

                    if (!limit || !currentPage) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }
                    const offset = (parseInt(page) - 1) * limit;

                    // Fetch paginated books
                    const books = await this.bookReviewService.getPaginatedBooks(limit, offset);
                    const totalBooks = await this.bookReviewService.getTotalBooksCount();

                    // Construct the grid response
                    const gridResponse = {
                        books,
                        currentPage,
                        itemsPerPage: limit,
                        totalPages: Math.ceil(totalBooks / limit),
                        total: totalBooks,
                    }

                    // Return the success response
                    return Response.success(res, Message.SUCCESS, gridResponse);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/book")
            .get(async (req, res, next) => {
                try {
                    const { id } = req.query;
                    if (!id) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS)
                    }
                    const book = await this.bookReviewService.getBookById(id);
                    return Response.success(res, Message.SUCCESS, book);

                } catch (error) {
                    next(error);
                }
            })
            .post(authMiddleware, upload.single('file'), bookValidSchema, validationHandler, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const book = await this.bookReviewService.createBook(userId, { ...req.body, file: req.file });
                    return Response.created(res, Message.BOOK_CREATED, book);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, upload.single("file"), bookValidSchema, validationHandler, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const book = await this.bookReviewService.updatedBookById(userId, { ...req.body, file: req.file });
                    return Response.success(res, Message.BOOK_UPDATED, book);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = BookReviewController;