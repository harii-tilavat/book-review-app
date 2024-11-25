const { authMiddleware } = require("../middlewares/authMiddlerware");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { validationHandler } = require("../validation");
const { reviewValidSchema } = require("../validation/bookReviewValidation");
const ReviewService = require("../services/reviewService");
const { Response, Message, StatusCode } = require("../utils/response");

class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }
    register(app) {
        app.route("/reviews")
            .get(authMiddleware, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const reviews = await this.reviewService.getReviewsByUserId(userId);
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
                    const review = await this.reviewService.createReview(userId, bookId, updatedReview);
                    return Response.success(res, Message.REVIEW_CREATED, review);
                } catch (error) {
                    next(error);
                }
            })
            .put(authMiddleware, reviewValidSchema, validationHandler, async (req, res, next) => {
                try {
                    const { userId } = req.user;
                    const { bookId, id, ...updatedReview } = req.body;

                    if (!bookId || !id) {
                        throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
                    }
                    const review = await this.reviewService.updateReviewById(userId, bookId, { id, ...updatedReview });
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
                    await this.reviewService.deleteReviewById(userId, id);
                    return Response.success(res, Message.REVIEW_DELETED);
                } catch (error) {
                    next(error);
                }
            })
    }
}
module.exports = ReviewController;