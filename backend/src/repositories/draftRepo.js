const prisma = require("../config/prismaClient");
class DraftRepo {
    async getPaginatedDrafts(limit, offset, userId = null) {
        try {
            // Build the where clause dynamically
            // const { isPublished, sortField, sortOrder } = filters;
            // const where = {
            //     ...(userId ? { userId } : {}),
            //     ...(typeof isPublished === 'boolean' ? { isPublished } : {})
            // };

            // Build the orderBy clause dynamically
            // const orderBy = sortField ? { [sortField]: sortOrder || 'asc' } : { createdAt: 'desc' };

            // Use Prisma to get paginated drafts
            const [drafts, totalDrafts] = await prisma.$transaction([
                prisma.draft.findMany({
                    where: { userId, isPublished: false },
                    // skip: offset,
                    // take: limit,
                    include: {
                        pages: true
                    },
                    orderBy: { createdAt: "desc" }
                }),
                prisma.draft.count({ where: { userId } })
            ]);
            return { drafts, totalDrafts };
        } catch (error) {
            throw new Error(`Error fetching paginated drafts: ${error.message}`);
        }
    }

    // Get draft by id
    async getDraftById(id) {
        try {
            return prisma.draft.findUnique({
                where: { id, isPublished: false },
                include: {
                    books: true,
                    pages: { orderBy: { order: "asc" } },
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
            // return await prisma.page.findMany({
            //     where: { draftId },
            //     skip: offset,
            //     take: limit,
            //     orderBy: { order: 'asc' }
            // })
            return await prisma.page.findMany({
                where: { draftId },
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
    async getPageById(id) {
        try {
            return await prisma.page.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(`Error getPageById for draft: ${error.message}`);
        }
    }
    async deletePageById(id) {
        try {
            return await prisma.page.delete({
                where: { id }
            });
        } catch (error) {
            throw new Error(`Error deleting page for draft: ${error.message}`);
        }
    }
    async updatePageForDraft(draftId, pageData) {
        const { id } = pageData;
        try {
            return await prisma.page.update({
                where: { id },
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