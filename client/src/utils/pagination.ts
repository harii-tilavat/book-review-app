import { PaginationResponseModel } from "../models/PaginationModel";

export const mapToPaginatedResponse = <T>(data: PaginationResponseModel<T>): PaginationResponseModel<T> => {
    return {
        currentPage: data.currentPage,
        items: data.items,
        itemsPerPage: data.itemsPerPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages
    }
}
