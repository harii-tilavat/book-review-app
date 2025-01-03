const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("../utils/response");
const FileUploader = require("../utils/uploader");
const { BookModel } = require("../models/bookModel");
const DraftRepo = require("../repositories/draftRepo");
class DraftService {
    constructor() {
        this.draftRepo = new DraftRepo();
    }

    // Fetch paginated books
    async getPaginatedBooks(limit, offset, filters = {}, userId = null) {
        try {
            // Fetch books and total count
            const { books, totalBooks } = await this.bookRepo.getPaginatedBooks(limit, offset, filters, userId);
            return {
                books: books.map(book => new BookModel(book)),
                totalBooks
            };
        } catch (error) {
            throw error;
        }
    }

    // Create a new book
    async createBook(userId, book) {
        try {
            const { title, author, genreId, file, isbn, description } = book;
            if (!file) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.FILE_MISSING);
            }

            // Upload the file buffer to Cloudinary and get the uploaded file's details
            const uploadedFile = await FileUploader.uploadStream(file.buffer);

            const upadatedBook = { title, author, genreId, cover: uploadedFile.secure_url, description, isbn };

            // Save the book details in the database and associate it with the user
            const newBook = await this.bookRepo.createBook(userId, upadatedBook);

            // Return the newly created book record without userId
            return new BookModel(newBook);
        } catch (error) {
            // If it's any other error, throw a generic one
            // throw new AppError(StatusCode.INTERNAL_SERVER_ERROR);
            throw error;
        }
    }

    // Fetch a single book by ID with recommendations based on genre or author
    async getBookById(id) {
        try {
            const book = await this.bookRepo.getBookById(id);
            if (!book) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOK_NOT_FOUND);
            }

            // Fetch recommended books (same genreId or author)
            const recommendations = await this.bookRepo.getRecommendations(book.genreId, book.author, book.id);
            return { book, recommendations };
        } catch (error) {
            throw error;
        }
    }

    // Update an existing book by ID
    async updatedBookById(userId, book) {
        try {
            const { file, id, ...updatedBook } = book;

            const currentBook = await this.bookRepo.getBookById(id);
            if (!currentBook || currentBook.userId !== userId) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.UNAUTHORIZED);
            }
            if (file) {
                const uploadedFile = await FileUploader.uploadStream(file.buffer);
                updatedBook.cover = uploadedFile.secure_url;
            }
            const newBook = await this.bookRepo.updateBookById(id, updatedBook);
            return new BookModel(newBook);
            // const book = await this.bookRepo.
        } catch (error) {
            throw error;
        }
    }

    // Delete a book by ID
    async deleteBookById(userId, id) {
        try {
            // Delete book
            const currentBook = await this.bookRepo.getBookById(id);
            if (!currentBook) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOK_NOT_FOUND);
            }
            if (currentBook.userId !== userId) {
                throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
            }

            return await this.bookRepo.deleteBookById(id);;
        } catch (error) {
            throw error;
        }
    }

    // Fetch all categories (genres)Category
    async getAllCategory() {
        try {
            return await this.bookRepo.getAllCategory();
        } catch (error) {
            throw error;
        }
    }
}
module.exports = DraftService;

