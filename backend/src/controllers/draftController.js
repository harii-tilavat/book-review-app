const { authMiddleware } = require("../middlewares/authMiddlerware");
const { bookValidSchema } = require("../validation/bookReviewValidation");
const { validationHandler } = require("../validation");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const PaginatioHelper = require("../utils/paginationHelper");
const { Response, Message, StatusCode } = require("../utils/response");
const DraftService = require("../services/draftService");

class DraftController {
    constructor() {
        this.draftService = new DraftService();
    }
    register(app) {
        app.route("/drafts")
            .get(async (req, res, next) => {
                try {
                    const { itemsPerPage, page, ...filters } = req.query;

                    const { limit, offset, currentPage } = PaginatioHelper.validatePagination(itemsPerPage, page);

                    // Fetch paginated books
                    const { books, totalBooks } = await this.bookService.getPaginatedBooks(limit, offset, filters);

                    // Construct the grid response
                    const gridResponse = PaginatioHelper.generatePaginatedResponse(books, currentPage, itemsPerPage, totalBooks);
                    // Return the success response
                    return await Response.success(res, Message.SUCCESS, gridResponse);
                } catch (error) {
                    next(error);
                }
            })
        app.route("/draft")
            .get(authMiddleware, async (req, res, next) => {
                try {
                    const { id } = req.query;
                    if (!id) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS)
                    }
                    const data = await this.bookService.getBookById(id);
                    return await Response.success(res, Message.SUCCESS, data);

                } catch (error) {
                    next(error);
                }
            })
            .post(authMiddleware, bookValidSchema, validationHandler, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const book = await this.bookService.createBook(userId, { ...req.body, file: req.file });
                    return Response.created(res, Message.BOOK_CREATED, book);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, bookValidSchema, validationHandler, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { id } = req.body;
                    if (!id) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }
                    const book = await this.bookService.updatedBookById(userId, { ...req.body, file: req.file });
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

                    await this.bookService.deleteBookById(userId, id);
                    return Response.success(res, Message.BOOK_DELETED);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = DraftController;