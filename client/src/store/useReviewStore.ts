import { create } from 'zustand';
import { GenericReponseModel } from '../models';
import { BookModel, ReviewModel } from '../models/BookModel';
import { handleApiError } from '../utils/api';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import useBookStore from './useBookStore';

// Zustand store for managing reviews
interface ReviewStore {
    isLoading: boolean;
    currentReview: ReviewModel | null;
    reviews: ReviewModel[];
    myReviews: ReviewModel[];
    getMyReviews: () => Promise<void>;
    createReview: (reviewData: ReviewModel) => Promise<void>;
    updateReview: (reviewData: ReviewModel) => Promise<void>;
    deleteReview: (id: string) => Promise<void>;
    setCurrentReview: (review: ReviewModel | null) => void;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
    isLoading: false,
    currentReview: null,
    reviews: [],
    myReviews: [],
    // Fetch My Reviews Handler
    getMyReviews: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get<GenericReponseModel<Array<ReviewModel>>>("/reviews");
            set({ myReviews: response.data.data || [] });
        } catch (error: any) {
            handleApiError(error);
            toast.error("Failed to load reviews: " + error?.message);
        } finally {
            set({ isLoading: false });
        }
    },

    // Create Review Handler
    createReview: async (reviewData: ReviewModel) => {
        set({ isLoading: true });
        try {
            const { bookId, rating, text } = reviewData;
            const { data } = await axiosInstance.post<GenericReponseModel<ReviewModel>>("/review", { bookId, rating, text });
            toast.success(data.message || "Review added successfully!");
            if (data.data) {
                const updatedReviews = [data.data, ...get().reviews]; // Add the new review at the front of the reviews list
                // Calculate the new average rating
                const newAvgRating = updatedReviews.reduce((total, review) => total + review.rating, 0) / updatedReviews.length;

                // Get currentBook from the bookStore
                const currentBook = useBookStore.getState().currentBook;

                // If currentBook exists, update it
                if (currentBook) {
                    const updatedCurrentBook: BookModel = {
                        ...currentBook,
                        reviews: updatedReviews, // Updated reviews list
                        avgRating: +newAvgRating.toFixed(2), // New average rating rounded to 2 decimal places
                    };

                    // Update both currentBook and reviews in their respective stores
                    useBookStore.setState({ currentBook: updatedCurrentBook });
                    set({ reviews: updatedReviews });
                }
            }
        } catch (error: any) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    // Update Review Handler
    updateReview: async (reviewData: ReviewModel) => {
        set({ isLoading: true }); // Start loading
        try {
            const { bookId, rating, text, id } = reviewData;
            const { data } = await axiosInstance.put<GenericReponseModel<ReviewModel>>(`/review`, { bookId, rating, text, id });
            toast.success(data.message || "Review updated successfully!");

            // Ensure data is returned
            if (data.data) {
                const editedReviewIndex = get().myReviews.findIndex(review => review.id === id);
                if (editedReviewIndex > -1) {
                    const updatedReviews = [...get().myReviews]; // Add the new review at the front of the reviews list
                    updatedReviews[editedReviewIndex] = data.data;
                    set({ myReviews: updatedReviews });
                }
            }
        } catch (error: any) {
            handleApiError(error);
            toast.error("Failed to update review: " + error?.message || "Unknown error");
        } finally {
            set({ isLoading: false }); // End loading
        }
    }
    ,

    // Delete Review Handler
    deleteReview: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.delete<GenericReponseModel<ReviewModel>>("/review", { data: { id } });
            toast.success(response.data.message || "Review deleted successfully!");
            set({ myReviews: [...get().myReviews.filter(review => review.id !== id)] });

        } catch (error: any) {
            handleApiError(error);
            toast.error("Failed to delete review: " + error?.message || "Unknown error");
        } finally {
            set({ isLoading: false });
        }
    },

    // Set Current Review
    setCurrentReview: (review: ReviewModel | null) => set({ currentReview: review }),
}));
