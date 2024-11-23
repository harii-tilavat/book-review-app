const prisma = require("../config/prismaClient");
class BookReviewRepo {
    // Fetch paginated books
    async getPaginatedBooks(limit, offset, filters = {}, userId = null) {
        try {
            // Build the where clause dynamically
            const { genreId, sortField, sortOrder } = filters;
            const where = {
                ...(userId ? { userId } : {}),
                ...(genreId ? { genreId } : {})
            }

            // Build the orderBy clause dynamically
            const orderBy = sortField ? { [sortField]: sortOrder || 'asc' } : undefined;

            // Use a Prisma transaction for parallel execution
            const [books, totalBooks] = await prisma.$transaction([
                prisma.book.findMany({
                    skip: offset,
                    take: limit,
                    where,
                    orderBy,
                    include: { genre: true }
                }),
                prisma.book.count({ where })
            ]);
            return { books, totalBooks };
        } catch (error) {
            throw new Error(`Error fetching paginated books: ${error.message}`);
        }
    }
    // Recommandation
    async getRecommendations(genreId, author, bookId, limit = 5) {
        try {
            return await prisma.book.findMany({
                where: {
                    AND: [
                        { id: { not: bookId } },
                        {
                            OR: [
                                { author },
                                { genreId }
                            ]
                        }
                    ]
                },
                take: limit,
                orderBy: [
                    { avgRating: 'desc' },
                    { createdAt: 'asc' }
                ],
                include: { genre: true }
            })
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
                    ...book,
                },
                include: { genre: true }
            });
            return newBook;
        } catch (error) {
            throw error;
        }
    }
    async getBookById(id) {
        try {
            const book = await prisma.book.findUnique({ where: { id }, include: { reviews: true, genre: true } });
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
    async deleteBookById(id) {
        try {
            return await prisma.book.delete({ where: { id } });
        } catch (error) {
            throw new Error(`Failed to delete book by ID ${id}: ${error.message}`);
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
    // Cetegory

    async getAllCategory() {
        try {
            return await prisma.genre.findMany();
        } catch (error) {
            throw error;
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
            return Math.round((result._avg.rating || 0));
        } catch (error) {
            throw error;
        }
    }
}
module.exports = BookReviewRepo;