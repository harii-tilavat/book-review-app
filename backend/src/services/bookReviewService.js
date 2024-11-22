const BookReviewRepo = require("../repositories/bookReviewRepo");

class BookReviewService {
    constructor() {
        this.bookReviewRepo = new BookReviewRepo();
    }
    async createBook(book) {
        try {
            const { userId, title, author, genre, file } = book;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = BookReviewService;