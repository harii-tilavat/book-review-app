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
            .get(authMiddleware, async (req, res, next) => {
                try {
                    const { itemsPerPage = 8, page = 1 } = req.query;
                    const { userId } = req.user;

                    const { limit, offset, currentPage } = PaginatioHelper.validatePagination(itemsPerPage, page);

                    // Fetch paginated books
                    const { drafts, totalDrafts } = await this.draftService.getPaginatedDrafts(limit, offset, userId);

                    // Construct the grid response
                    const gridResponse = PaginatioHelper.generatePaginatedResponse(drafts, currentPage, itemsPerPage, totalDrafts);
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
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }
                    const data = await this.draftService.getDraftById(id);
                    return await Response.success(res, Message.SUCCESS, data);

                } catch (error) {
                    next(error);
                }
            })
            .post(authMiddleware, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const draft = await this.draftService.createDraft(userId, req.body);
                    return Response.created(res, "Draft created successfully!", draft);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, async (req, res, next) => {
                const { userId } = req.user;
                try {
                    const draft = await this.draftService.updateDraft(userId, req.body);
                    return Response.created(res, "Draft saved successfully!", draft);
                } catch (error) {
                    next(error);
                }
            })
            .delete(authMiddleware, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { draftId } = req.query;
                    if (!draftId) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }

                    await this.draftService.deleteDraftById(userId, draftId);
                    return Response.success(res, "Draft deleted successfully!");
                } catch (error) {
                    next(error);
                }
            })
        // app.route("/draft/publish")
        //     .post(authMiddleware, async (req, res, next) => {
        //         const { userId } = req.user;
        //         const { draft, book } = req.body;
        //         try {
        //             const draft = await this.draftService.createDraft(userId, req.body);
        //             return Response.created(res, "Draft created successfully!", draft);
        //         } catch (error) {
        //             next(error);
        //         }
        //     })
        app.route("/draft/pages")
            .delete(authMiddleware, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { pageId } = req.query;
                    if (!pageId) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }

                    await this.draftService.deletePageById(userId, pageId);
                    return Response.success(res, "Page deleted successfully!");
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = DraftController;