import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import reviewApi from "../api/reviewApi";
import { ReviewModel } from "../models/BookModel";

export const useReviewApi = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Fetch My Reviews Handler
    const getMyReviews = useCallback(async (): Promise<Array<ReviewModel>> => {
        setIsLoading(true);
        try {
            const { data } = await reviewApi.getMyReviews();
            return data || [];
        } catch (error: any) {
            toast.error("Failed to load reviews: " + error?.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Create Review Handler
    const createReview = useCallback(async (reviewData: ReviewModel) => {
        setIsLoading(true);
        try {
            const { data, message } = await reviewApi.createReview(reviewData);
            toast.success(message || "Review added successfully!");
            return data!;
        } catch (error: any) {
            toast.error("Failed to create review : " + error?.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update Review Handler
    const updateReview = useCallback(async (reviewData: ReviewModel) => {
        setIsLoading(true);
        try {
            const { data, message } = await reviewApi.updateReview(reviewData);
            toast.success(message || "Review updated successfully!");
            return data!;
        } catch (error: any) {
            toast.error("Failed to update review: " + error?.message || "Unknown error");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Delete Review Handler
    const deleteReview = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const { message } = await reviewApi.deleteReview(id);
            toast.success(message || "Review deleted successfully!");
        } catch (error: any) {
            toast.error("Failed to update review: " + error?.message || "Unknown error");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { getMyReviews, createReview, updateReview, deleteReview, isLoading };
}