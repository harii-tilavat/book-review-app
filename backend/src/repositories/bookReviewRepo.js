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
            throw error;
        }
    }
}
module.exports = BookReviewRepo;