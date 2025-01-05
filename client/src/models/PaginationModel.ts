export class PaginationModel {
    itemsPerPage: number = 8;
    page: number = 1;
    totalPages?: number;
}
export class PaginationResponseModel<T> {
    currentPage: number;       // The current page number
    items: T[];                // The items for the current page
    itemsPerPage: number;      // Number of items per page
    totalItems: number;        // Total number of items
    totalPages: number;        // Total number of pages
    constructor() {
        this.currentPage = 1;
        this.items = [];
        this.itemsPerPage = 8;
        this.totalPages = 0;
        this.totalItems = 0;
    }

}
