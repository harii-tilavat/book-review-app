const prisma = require("../config/prismaClient");
class ReviewRepo {
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
}
module.exports = ReviewRepo;