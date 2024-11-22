const prisma = require("../config/prismaClient");
class BookReviewRepo {
    async createBook(userId, book) {
        try {
            const newBook = await prisma.book.create({
                data: {
                    userId,
                    ...book
                }
            });
            return newBook;
        } catch (error) {
            throw new Error(`Failed to create book. ${error.message}`);
        }
    }
    async getBookById(id) {
        try {
            const book = await prisma.book.findUnique({ where: { id }, include: { Review: true } });
            return book;
        } catch (error) {
            throw new Error(`Failed to fetch book by ID ${id}: ${error.message}`);
        }
    }
    async updateBookById(id, book) {
        try {
            const newBook = await prisma.book.update({
                where: { id },
                data: book
            });
            return newBook;
        } catch (error) {
            throw new Error(`Failed to update book by ID ${id}: ${error.message}`);
        }
    }
    async getAllReviewsById(id) {
        try {
            const reviews = await prisma.review.findMany({ where: { bookId: id } });
            return reviews;
        } catch (error) {
            throw new Error(`Failed to fetch reviews. ${id}: ${error.message}`);
        }
    }
}
module.exports = BookReviewRepo;