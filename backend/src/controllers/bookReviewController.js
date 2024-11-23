const { authMiddleware } = require("../middlewares/authMiddlerware");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const upload = require("../middlewares/uploadMiddlerware");
const { validationHandler } = require("../middlewares/validation");
const { bookValidSchema, reviewValidSchema } = require("../middlewares/validation/bookReviewValidation");
const BookReviewService = require("../services/bookReviewService");
const PaginatioHelper = require("../utils/paginationHelper");
const { Response, Message, StatusCode } = require("../utils/response");

class BookReviewController {
    constructor() {
        this.bookReviewService = new BookReviewService();
    }
    register(app) {
        app.route("/books")
            .get(async (req, res, next) => {
                try {
                    const { itemsPerPage, page, ...filters } = req.query;

                    const { limit, offset, currentPage } = PaginatioHelper.validatePagination(itemsPerPage, page);

                    // Fetch paginated books
                    const { books, totalBooks } = await this.bookReviewService.getPaginatedBooks(limit, offset, filters);

                    // Construct the grid response
                    const gridResponse = PaginatioHelper.generatePaginatedResponse(books, currentPage, itemsPerPage, totalBooks);
                    // Return the success response
                    return Response.success(res, Message.SUCCESS, gridResponse);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/my-books")
            .get(authMiddleware, async (req, res, next) => {
                try {
                    const { itemsPerPage, page, ...filters } = req.query;
                    const { userId } = req.user;

                    const { limit, offset, currentPage } = PaginatioHelper.validatePagination(itemsPerPage, page);

                    // Fetch paginated books
                    const { books, totalBooks } = await this.bookReviewService.getPaginatedBooks(limit, offset, filters, userId);

                    // Construct the grid response
                    const gridResponse = PaginatioHelper.generatePaginatedResponse(books, currentPage, itemsPerPage, totalBooks);
                    // Return the success response
                    return Response.success(res, Message.SUCCESS, gridResponse);
                    // Fetch paginated books
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
            .delete(authMiddleware, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { id } = req.body;
                    if (!id) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }

                    await this.bookReviewService.deleteBookById(userId, id);
                    return Response.success(res, Message.BOOK_DELETED);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/reviews")
            .get(authMiddleware, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const reviews = await this.bookReviewService.getReviewsByUserId(userId);
                    return Response.success(res, Message.SUCCESS, reviews);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/review")
            .post(authMiddleware, reviewValidSchema, validationHandler, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { bookId, ...updatedReview } = req.body;
                    const review = await this.bookReviewService.createReview(userId, bookId, updatedReview);
                    return Response.success(res, Message.REVIEW_CREATED, review);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, reviewValidSchema, validationHandler, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { bookId, ...updatedReview } = req.body;
                    const review = await this.bookReviewService.updateReviewById(userId, bookId, updatedReview);
                    return Response.success(res, Message.REVIEW_UPDATED, review);
                } catch (error) {
                    next(error);
                }
            })
            .delete(authMiddleware, async (req, res, next) => {
                try {
                    const { id } = req.body;
                    const { userId } = req.user;
                    if (!id) {
                        throw new AppError(StatusCode.BAD_GATEWAY, Message.INVALID_PARAMS);
                    }
                    await this.bookReviewService.deleteReviewById(userId, id);
                    return Response.success(res, Message.REVIEW_DELETED);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/categories")
            .get(async (req, res, next) => {
                try {
                    const categories = await this.bookReviewService.getAllCategory();
                    return Response.success(res, Message.SUCCESS, categories);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = BookReviewController;