const { AppError } = require("../middlewares/errorHandlerMiddleware");
const { StatusCode, Message } = require("./response");

class PaginatioHelper {
    static validatePagination(itemsPerPage, page) {

        const limit = parseInt(itemsPerPage);
        const currentPage = parseInt(page);
        // Validate query parameters

        if (isNaN(limit) || limit <= 0 || isNaN(currentPage) || currentPage <= 0) {
            throw new AppError(StatusCode.BAD_REQUEST, Message.INVALID_PARAMS);
        }
        const offset = (currentPage - 1) * limit;
        return { limit, currentPage, offset };
    }


    /**
 * Generate a paginated grid response
 * @param {Array} items - The list of items for the current page
 * @param {number} currentPage - The current page number
 * @param {number} itemsPerPage - The number of items per page
 * @param {number} totalItems - The total number of items
 * @returns {Object} - The paginated grid response
 */
    static generatePaginatedResponse(items, currentPage, itemsPerPage, totalItems) {
        return {
            items,
            currentPage,
            itemsPerPage: parseInt(itemsPerPage),
            totalPages: Math.ceil(totalItems / itemsPerPage),
            totalItems,
        };
    }

}
module.exports = PaginatioHelper;