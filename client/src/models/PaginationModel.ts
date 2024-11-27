export class PaginationModel {
    itemsPerPage: number = 8;
    page: number = 1;
    totalPages?: number;
}
export interface PaginationResponseModel<T> {
    currentPage: number;       // The current page number
    items: T[];                // The items for the current page
    itemsPerPage: number;      // Number of items per page
    totalItems: number;        // Total number of items
    totalPages: number;        // Total number of pages
}
