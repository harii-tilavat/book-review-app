const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("../utils/response");
const DraftRepo = require("../repositories/draftRepo");
class DraftService {
    constructor() {
        this.draftRepo = new DraftRepo();
    }

    // Fetch paginated drafts
    async getPaginatedDrafts(limit, offset, userId = null) {
        try {
            // Fetch drafts and total count
            const { drafts, totalDrafts } = await this.draftRepo.getPaginatedDrafts(limit, offset, userId);
            return {
                drafts,
                totalDrafts
            };
        } catch (error) {
            throw error;
        }
    }

    // Create a new book
    async createDraft(userId, draft) {
        try {
            const { title = null, pages = [] } = draft;

            // Create draft
            const newDraft = await this.draftRepo.createDraft(userId, { title });

            const { id: draftId } = newDraft;

            // Process pages asynchronously
            await Promise.all(
                pages.map(async (page) => {
                    const { content = null, order, type } = page;
                    return this.draftRepo.createPageForDraft(draftId, { content, order, type });
                })
            )
            // Fetch the updated draft to return
            const updatedDraft = await this.draftRepo.getDraftById(draftId);

            // Return new Draft
            return updatedDraft;
        } catch (error) {
            // If it's any other error, throw a generic one
            // throw new AppError(StatusCode.INTERNAL_SERVER_ERROR);
            throw error;
        }
    }

    // Create a new book
    async updateDraft(userId, draft) {
        try {
            const { title = null, id, pages = [] } = draft;
            // Check if it's a new draft or an update

            const currentDraft = await this.draftRepo.getDraftById(id);
            if (!currentDraft || currentDraft.userId !== userId) {
                throw new AppError(StatusCode.UNAUTHORIZED, Message.UNAUTHORIZED);
            }
            await this.draftRepo.updateDraft(id, { title });

            // Process pages asynchronously
            await Promise.all(
                pages.map(async (page) => {
                    const { id: pageId, content = null, order, type, isChanged } = page;
                    if (!pageId) {
                        // Create page
                        return this.draftRepo.createPageForDraft(id, { content, order, type });
                    } else {
                        // Update page
                        if (isChanged) {
                            return this.draftRepo.updatePageForDraft(id, { content, order, type, id: pageId });
                        }
                    }
                })
            )
            // Fetch the updated draft to return
            const newDraft = await this.draftRepo.getDraftById(id);

            // Return new Draft
            return newDraft;
        } catch (error) {
            // If it's any other error, throw a generic one
            // throw new AppError(StatusCode.INTERNAL_SERVER_ERROR);
            throw error;
        }
    }

    // Fetch a single book by ID with recommendations based on genre or author
    async getDraftById(id) {
        try {
            const draft = await this.draftRepo.getDraftById(id);
            if (!draft) {
                throw new AppError(StatusCode.NOT_FOUND, Message.BOOK_NOT_FOUND);
            }
            return draft;
        } catch (error) {
            throw error;
        }
    }
    // Delete a Draft by ID
    async deleteDraftById(userId, draftId) {
        try {
            // Delete book
            const currentDraft = await this.draftRepo.getDraftById(draftId);
            if (!currentDraft) {
                throw new AppError(StatusCode.NOT_FOUND, Message.NOT_FOUND);
            }
            if (currentDraft.userId !== userId) {
                throw new AppError(StatusCode.FORBIDDEN, Message.UNAUTHORIZED);
            }

            return await this.draftRepo.deleteDraft(draftId);
        } catch (error) {
            throw error;
        }
    }
    async deletePageById(userId, pageId) {
        try {
            // Delete book
            const currentPage = await this.draftRepo.getPageById(pageId);
            if (!currentPage) {
                throw new AppError(StatusCode.NOT_FOUND, Message.NOT_FOUND);
            }
            return await this.draftRepo.deletePageById(pageId);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = DraftService;

