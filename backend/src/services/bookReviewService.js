const BookReviewRepo = require("../repositories/bookReviewRepo");
const cloudinary = require("../config/cloudinary.config");
const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("../utils/response");
const FileUploader = require("../utils/uploader");
class BookReviewService {
    constructor() {
        this.bookReviewRepo = new BookReviewRepo();
    }
    async createBook(book) {
        try {
            const { userId, title, author, genre, file } = book;
            if (!file) {
                throw new AppError(StatusCode.BAD_REQUEST, Message.FILE_MISSING);
            }
            const uploadedFile = await FileUploader.uploadStream(file.buffer);

            const upadatedBook = { title, author, genre, cover: uploadedFile.secure_url };
            const newBook = await this.bookReviewRepo.createBook(userId, upadatedBook);
            return newBook;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = BookReviewService;