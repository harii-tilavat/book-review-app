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
    async getPaginatedBooks(limit, offset) {
        try {
            const books = await this.bookReviewRepo.getPaginatedBooks(limit, offset);
            if (!books.length) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOKS_NOT_FOUND);
            }
            return books.map(book => new BookModel(book));
        } catch (error) {
            throw error;
        }
    }
    // Count total books
    async getTotalBooksCount() {
        try {
            return await this.bookReviewRepo.getTotalBooksCount();
        } catch (error) {
            throw error;
        }
    }
    async createBook(userId, book) {
        try {
            const { title, author, genre, file } = book;
            if (!file) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.FILE_MISSING);
            }

            // Upload the file buffer to Cloudinary and get the uploaded file's details
            const uploadedFile = await FileUploader.uploadStream(file.buffer);

            const upadatedBook = { title, author, genre, cover: uploadedFile.secure_url };

            // Save the book details in the database and associate it with the user
            const newBook = await this.bookReviewRepo.createBook(userId, upadatedBook);

            // Return the newly created book record without userId
            return new BookModel(newBook);
        } catch (error) {
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
}
module.exports = BookReviewService;