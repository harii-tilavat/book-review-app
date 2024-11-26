const { authMiddleware } = require("../middlewares/authMiddlerware");
const upload = require("../middlewares/uploadMiddlerware");
const { bookValidSchema } = require("../validation/bookReviewValidation");
const { validationHandler } = require("../validation");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const BookService = require("../services/bookService");
const PaginatioHelper = require("../utils/paginationHelper");
const { Response, Message, StatusCode } = require("../utils/response");

class BookController {
    constructor() {
        this.bookService = new BookService();
    }
    register(app) {
        app.route("/books")
            .get(async (req, res, next) => {
                try {
                    const { itemsPerPage, page, ...filters } = req.query;

                    const { limit, offset, currentPage } = PaginatioHelper.validatePagination(itemsPerPage, page);

                    // Fetch paginated books
                    const { books, totalBooks } = await this.bookService.getPaginatedBooks(limit, offset, filters);

                    // Construct the grid response
                    const gridResponse = PaginatioHelper.generatePaginatedResponse(books, currentPage, itemsPerPage, totalBooks);
                    // Return the success response
                    setTimeout(async () => {
                        return await Response.success(res, Message.SUCCESS, gridResponse);
                    }, 2000);
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
                    const { books, totalBooks } = await this.bookService.getPaginatedBooks(limit, offset, filters, userId);

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
                    const data = await this.bookService.getBookById(id);
                    return Response.success(res, Message.SUCCESS, data);

                } catch (error) {
                    next(error);
                }
            })
            .post(authMiddleware, upload.single('file'), bookValidSchema, validationHandler, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const book = await this.bookService.createBook(userId, { ...req.body, file: req.file });
                    return Response.created(res, Message.BOOK_CREATED, book);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, upload.single("file"), bookValidSchema, validationHandler, async (req, res, next) => {
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
        app.route("/categories")
            .get(async (req, res, next) => {
                try {
                    const categories = await this.bookService.getAllCategory();
                    return Response.success(res, Message.SUCCESS, categories);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = BookController;