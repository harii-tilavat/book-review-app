import { Dialog, DialogTitle } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import TextBox from "./TextBox";
import { ReviewModel } from "../../models/BookModel";
import Button from "./Button";

interface ReviewModelProps {
  isReviewOpen: boolean;
  selectedReview?: ReviewModel;
  isLoading: boolean;
  onCloseReview: () => void;
  onSubmitReview: (data: ReviewFormValues) => void;
}
export interface ReviewFormValues {
  rating: number;
  text: string;
}
const ReviewFormModal: React.FC<ReviewModelProps> = ({ selectedReview, isReviewOpen, onCloseReview, onSubmitReview, isLoading = false }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: selectedReview?.rating || 1, text: selectedReview?.text || "" },
  });
  function handleSubmitReview(data: ReviewFormValues): void {
    onSubmitReview({ ...data, rating: +data.rating });
  }
  return (
    <div className="review-modal">
      {isReviewOpen && (
        <Dialog open={isReviewOpen} onClose={onCloseReview} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
              {/* Title */}
              <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add Your Review</DialogTitle>

              {/* Form */}
              <form className="mt-6 space-y-6" onSubmit={handleSubmit(handleSubmitReview)}>
                {/* Rating Field */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Rating
                  </label>
                  <select id="rating" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-1 py-2" {...register("rating")}>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                {/* Review Field */}
                <TextBox isTextArea id="review" label="Review" placeholder="Write your review here..." register={register("text", { required: "Review is required." })} error={errors.text} />

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300" onClick={onCloseReview}>
                    Cancel
                  </button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>{selectedReview ? "Updating review..." : "Adding review..."}</span>
                      </div>
                    ) : (
                      <span>{selectedReview ? "Update Review" : "Add Review"}</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewFormModal;
