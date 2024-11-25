import { GenericReponseModel } from '../_models';
import { ReviewModel } from '../_models/BookModel';
import { handleApiError } from '../utils/api';
import axiosInstance from './axiosInstance';

const reviewApi = {
    // Login API
    getMyReviews: async (): Promise<GenericReponseModel<Array<ReviewModel>>> => {
        try {
            const response = await axiosInstance.get("/reviews");
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    createReview: async (data: ReviewModel): Promise<GenericReponseModel<ReviewModel>> => {
        try {
            const { bookId, rating, text } = data;
            const response = await axiosInstance.post("/review", { bookId, rating, text });
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    updateReview: async (data: ReviewModel): Promise<GenericReponseModel<ReviewModel>> => {
        try {
            const { bookId, rating, text, id } = data;
            const response = await axiosInstance.put("/review", { bookId, rating, text, id });
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    deleteReview: async (id: string): Promise<GenericReponseModel<ReviewModel>> => {
        try {
            const response = await axiosInstance.delete("/review", { data: { id } });
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
}
export default reviewApi;