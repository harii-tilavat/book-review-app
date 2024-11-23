const cloudinary = require("../config/cloudinary.config");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("../utils/response");
const FileUploader = require("../utils/uploader");
const { BookModel } = require("../models/bookModel");
const ReviewRepo = require("../repositories/reviewRepo");
const BookRepo = require("../repositories/bookRepo");
class ReviewService {
    constructor() {
        this.reviewRepo = new ReviewRepo();
        this.bookRepo = new BookRepo();
    }

    // Fetch all reviews by a user
    async getReviewsByUserId(userId) {
        try {
            return await this.reviewRepo.getAllReviewsByUserId(userId);;
        } catch (error) {
            throw error;
        }
    }

    // Create a new review for a book
    async createReview(userId, bookId, review) {
        try {
            const { text, rating } = review;
            const currentBook = await this.bookRepo.getBookById(bookId);

            // Check if the book exists
            if (!currentBook) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.BOOK_NOT_FOUND);
            }
            // Create a review
            const currentReview = await this.reviewRepo.createReview(userId, bookId, { text, rating });

            // Calculate the new average rating
            const avgRating = await this.bookRepo.calculateAvgRating(bookId);

            // Update the book with the new average rating
            await this.bookRepo.updateBookById(bookId, { avgRating });
            return currentReview;
        } catch (error) {
            throw error;
        }
    }

    // Update an existing review by ID
    async updateReviewById(userId, bookId, review) {
        const { id, text, rating } = review;

        // Step 1: Fetch the review and check if it exists and belongs to the user
        const currentReview = await this.reviewRepo.getReviewById(id);
        if (!currentReview) {
            throw new AppError(StatusCode.NOT_FOUND, Message.REVIEW_NOT_FOUND);
        }
        if (currentReview.userId !== userId) {
            throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
        }

        // Step 2: Delete the review
        const updatedReview = await this.reviewRepo.updateReviewById(id, { text, rating });

        // Step 3: Recalculate and update the average rating for the associated book
        const avgRating = await this.bookRepo.calculateAvgRating(bookId);
        await this.bookRepo.updateBookById(bookId, { avgRating });

        return updatedReview;
    }

    // Delete a review by ID and update the book's average rating
    async deleteReviewById(userId, id) {

        // Step 1: Fetch the review and check if it exists and belongs to the user
        const currentReview = await this.reviewRepo.getReviewById(id);
        if (!currentReview) {
            throw new AppError(StatusCode.NOT_FOUND, Message.REVIEW_NOT_FOUND);
        }
        if (currentReview.userId !== userId) {
            throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
        }

        // Step 2: Delete the review
        await this.reviewRepo.deleteReviewById(id);

        // Step 3: Recalculate and update the average rating for the associated book
        const avgRating = await this.bookRepo.calculateAvgRating(currentReview.bookId);
        await this.bookRepo.updateBookById(currentReview.bookId, { avgRating });
        return;
    }
}
module.exports = ReviewService;

