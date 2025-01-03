const prisma = require("../config/prismaClient");
class DraftRepo {
    // Get draft by id
    async getDraftById(id) {
        try {
            return prisma.draft.findUnique({
                where: { id },
                include: {
                    books: true,
                    pages: true,
                }
            })
        } catch (error) {
            throw new Error(`Failed to fetch draft by ID ${id}: ${error.message}`);
        }
    }
    // Create a draft
    async createDraft(userId, draftData) {
        try {
            return prisma.draft.create({
                data: {
                    userId,
                    ...draftData
                },
                include: {
                    books: true,
                    pages: true
                }
            })
        } catch (error) {
            throw new Error(`Failed to create draft by ID ${userId}: ${error.message}`);
        }
    }
    // Update a draft
    async updateDraft(id, draftData) {
        try {
            return prisma.draft.update({
                where: { id },
                data: draftData,
                include: {
                    books: true,
                    pages: true
                }
            })
        } catch (error) {
            throw new Error(`Failed to fetch draft by ID ${id}: ${error.message}`);
        }
    }
    // Update a draft
    async deleteDraft(id) {
        try {
            return await prisma.draft.delete({
                where: { id }
            });

        } catch (error) {
            throw new Error(`Error deleting draft: ${error.message}`);
        }
    }
    // Get pages for draft
    async getPagesForDraft(draftId, limit = 5, offset = 0) {
        try {
            return await prisma.page.findMany({
                where: { draftId },
                skip: offset,
                take: limit,
                orderBy: { order: 'asc' }
            })
        } catch (error) {
            throw new Error(`Error fetching pages for draft ${draftId}: ${error.message}`);
        }
    }
    // Create page for draft
    async createPageForDraft(draftId, pageData) {
        try {
            return await prisma.page.create({
                data: {
                    draftId,
                    ...pageData,
                }
            });
        } catch (error) {
            throw new Error(`Error creating page for draft: ${error.message}`);
        }
    }
    // Update page for draft
    async updatePageForDraft(draftId, pageData) {
        try {
            return await prisma.page.update({
                data: {
                    draftId,
                    ...pageData,
                }
            });
        } catch (error) {
            throw new Error(`Error creating page for draft: ${error.message}`);
        }
    }
}
module.exports = DraftRepo;