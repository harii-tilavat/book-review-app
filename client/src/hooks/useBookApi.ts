import { useCallback, useState } from "react"
import { BookResponseModel, FilterModel } from "../models/BookModel";
import { PaginationModel } from "../models/PaginationModel";
import { toast } from "react-toastify";
import bookApi from "../api/bookApi";
import { useBook } from "../context/BookContext";

const useBookApi = () => {
    const [isLoading, setIsloading] = useState(false);
    const { setGenres } = useBook();
    // const [error, setError] = useState<string | null>(null);

    // Helper function to handle API calls and show loading state
    const handleApiRequest = async<T>(apiCall: Promise<T>, errorMessage: string, showError = true): Promise<T> => {
        setIsloading(true);
        // setError(null);
        try {
            const response = await apiCall;
            return response;
        } catch (error: any) {
            // setError(error?.message || errorMessage);
            if (showError) toast.error(error?.message || errorMessage || "Something went wrong. Try again.");
            throw error;
        } finally {
            setIsloading(false);
        }
    }
    // Fetch all books with pagination and filters
    const getAllBooks = useCallback(async <T>(params: PaginationModel, isMyBooks: boolean = false, filters: FilterModel) => {
        return await handleApiRequest(bookApi.getAllBooks<T>(params, isMyBooks, filters), "Failed to get books.");
    }, []);

    // Fetch book by ID
    const getBookById = useCallback(async (id: string): Promise<BookResponseModel> => {
        return await handleApiRequest<BookResponseModel>(bookApi.getBookById(id), "Failed to get book.",false);
    }, []);

    // Create a new book
    const createBook = useCallback(async (formData: FormData) => {
        return await handleApiRequest(bookApi.createBook(formData), "Failed to create book.");
    }, []);

    // Update book details
    const updateBook = useCallback(async (formData: FormData) => {
        return await handleApiRequest(bookApi.updateBook(formData), "Failed to update book.");
    }, []);

    // Delete book details
    const deleteBook = useCallback(async (id: string) => {
        return await handleApiRequest(bookApi.deleteBook(id), "Failed to delete book.");
    }, []);

    // Fetch all genres
    const getAllGenres = useCallback(async () => {
        const genres = await handleApiRequest(bookApi.getAllGenre(), "Failed to get genres.") || [];
        setGenres(genres);
        return genres;
    }, []);

    return {
        isLoading,
        // error,
        getAllBooks,
        getBookById,
        createBook,
        updateBook,
        deleteBook,
        getAllGenres,
    }
}
export default useBookApi;