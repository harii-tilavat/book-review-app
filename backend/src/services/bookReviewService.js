const BookReviewRepo = require("../repositories/bookReviewRepo");
const cloudinary = require("../config/cloudinary.config");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("../utils/response");
const FileUploader = require("../utils/uploader");
const { BookModel } = require("../models/BookReviewModel");
class BookReviewService {
    constructor() {
        this.bookReviewRepo = new BookReviewRepo();
    }

    // Fetch paginated books
    async getPaginatedBooks(limit, offset, filters = {}, userId = null) {
        try {
            // Fetch books and total count
            const { books, totalBooks } = await this.bookReviewRepo.getPaginatedBooks(limit, offset, filters, userId);
            return {
                books: books.map(book => new BookModel(book)),
                totalBooks
            };
        } catch (error) {
            throw error;
        }
    }
    async createBook(userId, book) {
        try {
            const { title, author, genreId, file } = book;
            if (!file) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.FILE_MISSING);
            }

            // Upload the file buffer to Cloudinary and get the uploaded file's details
            const uploadedFile = await FileUploader.uploadStream(file.buffer);

            const upadatedBook = { title, author, genreId, cover: uploadedFile.secure_url };

            // Save the book details in the database and associate it with the user
            const newBook = await this.bookReviewRepo.createBook(userId, upadatedBook);

            // Return the newly created book record without userId
            return new BookModel(newBook);
        } catch (error) {
            // If it's any other error, throw a generic one
            // throw new AppError(StatusCode.INTERNAL_SERVER_ERROR);
            throw error;
        }
    }
    async getBookById(id) {
        try {
            const book = await this.bookReviewRepo.getBookById(id);
            if (!book) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOK_NOT_FOUND);
            }
            // const reviews = await this.bookReviewRepo.getAllReviewsById(id) || [];
            // return new BookModel(book);
            return book;
        } catch (error) {
            throw error;
        }
    }
    async updatedBookById(userId, book) {
        try {
            const { file, id, ...updatedBook } = book;

            const currentBook = await this.bookReviewRepo.getBookById(id);
            if (!currentBook || currentBook.userId !== userId) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.UNAUTHORIZED);
            }
            if (file) {
                const uploadedFile = await FileUploader.uploadStream(file.buffer);
                updatedBook.cover = uploadedFile.secure_url;
            }
            const newBook = await this.bookReviewRepo.updateBookById(id, updatedBook);
            return new BookModel(newBook);
            // const book = await this.bookReviewRepo.
        } catch (error) {
            throw error;
        }
    }
    async deleteBookById(userId, id) {
        try {
            // Delete book
            const currentBook = await this.bookReviewRepo.getBookById(id);
            if (!currentBook) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOK_NOT_FOUND);
            }
            if (currentBook.userId !== userId) {
                throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
            }

            return await this.bookReviewRepo.deleteBookById(id);;
        } catch (error) {
            throw error;
        }
    }

    // Category

    async getAllCategory() {
        try {
            return await this.bookReviewRepo.getAllCategory();
        } catch (error) {
            throw error;
        }
    }
    // ------------------- Review Related REPO --------------------------

    // Get review by userId
    async getReviewsByUserId(userId) {
        try {
            const reviews = await this.bookReviewRepo.getAllReviewsByUserId(userId);
            if (!reviews.length) {
                throw new AppError(StatusCode.NOT_FOUND, Message.REVIEWS_NOT_FOUND);
            }
            return reviews;
        } catch (error) {
            throw error;
        }
    }
    async createReview(userId, bookId, review) {
        try {
            const { text, rating } = review;
            const currentBook = await this.bookReviewRepo.getBookById(bookId);

            // Check if the book exists
            if (!currentBook) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.BOOK_NOT_FOUND);
            }
            // Create a review
            const currentReview = await this.bookReviewRepo.createReview(userId, bookId, { text, rating });

            // Calculate the new average rating
            const avgRating = await this.bookReviewRepo.calculateAvgRating(bookId);

            // Update the book with the new average rating
            await this.bookReviewRepo.updateBookById(bookId, { avgRating });
            return currentReview;
        } catch (error) {
            throw error;
        }
    }
    // Update review
    async updateReviewById(userId, bookId, review) {
        const { id, text, rating } = review;

        // Step 1: Fetch the review and check if it exists and belongs to the user
        const currentReview = await this.bookReviewRepo.getReviewById(id);
        if (!currentReview) {
            throw new AppError(StatusCode.NOT_FOUND, Message.REVIEW_NOT_FOUND);
        }
        if (currentReview.userId !== userId) {
            throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
        }

        // Step 2: Delete the review
        const updatedReview = await this.bookReviewRepo.updateReviewById(id, { text, rating });

        // Step 3: Recalculate and update the average rating for the associated book
        const avgRating = await this.bookReviewRepo.calculateAvgRating(bookId);
        await this.bookReviewRepo.updateBookById(bookId, { avgRating });

        return updatedReview;
    }
    async deleteReviewById(userId, id) {

        // Step 1: Fetch the review and check if it exists and belongs to the user
        const currentReview = await this.bookReviewRepo.getReviewById(id);
        if (!currentReview) {
            throw new AppError(StatusCode.NOT_FOUND, Message.REVIEW_NOT_FOUND);
        }
        if (currentReview.userId !== userId) {
            throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
        }

        // Step 2: Delete the review
        await this.bookReviewRepo.deleteReviewById(id);

        // Step 3: Recalculate and update the average rating for the associated book
        const avgRating = await this.bookReviewRepo.calculateAvgRating(currentReview.bookId);
        await this.bookReviewRepo.updateBookById(currentReview.bookId, { avgRating });
        return;
    }
}
module.exports = BookReviewService;

