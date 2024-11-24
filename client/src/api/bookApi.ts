import { GenricReponseModel } from '../_models';
import { BookModel, BookResponseModel } from '../_models/BookModel';
import GenreModel from '../_models/GenreModel';
import { PaginationModel, PaginationResponseModel } from '../_models/PaginationModel';
import { createQueryParams, handleApiError } from '../utils/api';
import { mapToPaginatedResponse } from '../utils/pagination';
import axiosInstance from './axiosInstance';

const bookApi = {
    // Login API
    getAllBooks: async <T>(params: PaginationModel, isMyBooks: boolean = false): Promise<PaginationResponseModel<T>> => {
        try {
            const url = isMyBooks ? '/my-books' : '/books';
            const { data } = await axiosInstance.get(url + createQueryParams(params));
            return mapToPaginatedResponse<T>(data && data.data);
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    getBookById: async (id: string): Promise<BookResponseModel> => {
        try {
            const { data } = await axiosInstance.get("/book" + createQueryParams({ id }));
            return data && data.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    createBook: async (formData: FormData): Promise<GenricReponseModel> => {
        try {
            const { data } = await axiosInstance.post("/book", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    updateBook: async (formData: FormData): Promise<GenricReponseModel> => {
        try {
            const { data } = await axiosInstance.put("/book", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    deleteBook: async (id: string): Promise<GenricReponseModel> => {
        try {
            const { data } = await axiosInstance.delete("/book", { data: { id } });
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getAllGenre: async (): Promise<Array<GenreModel>> => {
        try {
            const { data } = await axiosInstance.get("/categories");
            return data && data.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
}
export default bookApi;