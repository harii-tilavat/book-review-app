const prisma = require("../config/prismaClient");
class BookReviewRepo {
    // Fetch paginated books
    async getPaginatedBooks(limit, offset) {
        try {
            return await prisma.book.findMany({
                skip: offset,
                take: limit,
                // include:{reviews:true}
            });
        } catch (error) {
            throw new Error(`Error fetching paginated books: ${error.message}`);
        }
    }

    // Count total books
    async getTotalBooksCount() {
        try {
            return await prisma.book.count();
        } catch (error) {
            throw error;
        }
    }

    // Create book by userId
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
            const book = await prisma.book.findUnique({ where: { id }, include: { reviews: true } });
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

    // Review related 

    // Get all
    async getAllReviewsByUserId(userId) {
        try {
            return await prisma.review.findMany({ where: { userId }, include: { book: true } });
        } catch (error) {
            throw error;
        }
    }

    // Create review
    async createReview(userId, bookId, review) {
        try {
            return await prisma.review.create({
                data: {
                    bookId,
                    userId,
                    ...review
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async updateReviewById(id, review) {
        try {
            return prisma.review.update({ where: { id }, data: review });
        } catch (error) {
            throw error;
        }
    }
    async getReviewById(id) {
        try {
            return await prisma.review.findUnique({ where: { id } });
        } catch (error) {
            throw error;
        }
    }
    async deleteReviewById(id) {
        try {
            return await prisma.review.delete({ where: { id } });
        } catch (error) {
            throw error;
        }
    }
    async calculateAvgRating(bookId) {
        try {
            const result = await prisma.review.aggregate({ where: { bookId }, _avg: { rating: true } });
            return result._avg.rating || 0;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = BookReviewRepo;