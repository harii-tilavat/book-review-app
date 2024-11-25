import { Dialog, DialogTitle } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import TextBox from "./TextBox";
import { ReviewModel } from "../../_models/BookModel";

interface ReviewModelProps {
  isReviewOpen: boolean;
  currentReview?: ReviewModel;
  onCloseReview: () => void;
  onSubmitReview: (data: ReviewFormValues) => void;
}
export interface ReviewFormValues {
  rating: number;
  text: string;
}
const ReviewFormModal: React.FC<ReviewModelProps> = ({ currentReview, isReviewOpen, onCloseReview, onSubmitReview }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: currentReview?.rating || 1, text: currentReview?.text || "" },
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
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                    Submit
                  </button>
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
