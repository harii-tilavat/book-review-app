import { create } from "zustand";
import { toast } from "react-toastify";
import { GenericReponseModel } from "../models";
import { BookModel, BookResponseModel } from "../models/BookModel";
import GenreModel from "../models/GenreModel";
import { PaginationModel, PaginationResponseModel } from "../models/PaginationModel";
import { createQueryParams, handleApiError } from "../utils/api";
import { mapToPaginatedResponse } from "../utils/pagination";
import axiosInstance from "../api/axiosInstance";
import { useReviewStore } from "./useReviewStore";

interface BookStore {
    isLoading: boolean;
    booksData: PaginationResponseModel<BookModel>;
    recommendations: Array<BookModel>;
    currentBook: BookModel | null;
    genres: GenreModel[];
    setLoading: (value: boolean) => void;
    getAllBooks: (pagination: PaginationModel, isMyBooks: boolean, filters: any) => Promise<void>;
    getBookById: (id: string) => Promise<void>;
    createBook: (formData: FormData) => Promise<GenericReponseModel>;
    updateBook: (formData: FormData) => Promise<GenericReponseModel>;
    deleteBook: (id: string) => Promise<GenericReponseModel>;
    getAllGenres: () => Promise<void>;
}

const useBookStore = create<BookStore>((set, get) => ({
    isLoading: false,
    booksData: new PaginationResponseModel<BookModel>(),
    currentBook: null,
    genres: [],
    recommendations: [],
    pagination: { page: 1, size: 10 },

    setLoading: (value) => set({ isLoading: value }),

    getAllBooks: async (pagination: PaginationModel, isMyBooks = false, filters: any) => {
        const { setLoading } = get();
        const url = isMyBooks ? "/my-books" : "/books";
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(url + createQueryParams({ ...pagination, ...filters }));
            const newBookData = mapToPaginatedResponse<BookModel>(data?.data);
            set({ booksData: newBookData });
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to get books.");
        } finally {
            setLoading(false);
        }
    },

    getBookById: async (id) => {
        const { setLoading } = get();
        setLoading(true);
        try {
            const { data } = await axiosInstance.get<GenericReponseModel<BookResponseModel>>("/book" + createQueryParams({ id }));
            if (data.data) {
                set({ currentBook: data?.data?.book, recommendations: data.data.recommendations });
                useReviewStore.setState({ reviews: data.data.book.reviews });
            }
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to get book.");
        } finally {
            setLoading(false);
        }
    },

    createBook: async (formData) => {
        const { setLoading } = get();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/book", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to create book.");
            throw error;
        } finally {
            setLoading(false);
        }
    },

    updateBook: async (formData) => {
        const { setLoading } = get();
        setLoading(true);
        try {
            const { data } = await axiosInstance.put("/book", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to update book.");
            throw error;
        } finally {
            setLoading(false);
        }
    },

    deleteBook: async (id) => {
        const { setLoading } = get();
        setLoading(true);
        try {
            const { data } = await axiosInstance.delete("/book", { data: { id } });
            return data;
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to delete book.");
            throw error;
        } finally {
            setLoading(false);
        }
    },

    getAllGenres: async () => {
        const { setLoading } = get();
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/categories");
            set({ genres: data?.data || [] });
        } catch (error) {
            handleApiError(error);
            toast.error("Failed to get genres.");
        } finally {
            setLoading(false);
        }
    },
}));

export default useBookStore;
