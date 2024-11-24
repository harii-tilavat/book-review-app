import React, { useState } from "react";
import { ReviewModel } from "../_models/BookModel";
import { Dialog, DialogTitle } from "@headlessui/react";
import { DUMMY_BOOKS } from "../utils/constants";

interface ReviewItemProps {
  review: ReviewModel;
  onEdit: (reviewId: string) => void;
  onDelete: (reviewId: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{"Book title"}</div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(review.id)} className="text-blue-600 dark:text-blue-400 hover:underline">
            Edit
          </button>
          <button onClick={() => onDelete(review.id)} className="text-red-600 dark:text-red-400 hover:underline">
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <div className="text-yellow-400">{"★".repeat(review.rating)}</div>
        <div className="text-gray-500 dark:text-gray-300">({review.rating} stars)</div>
      </div>

      <div className="mt-4 text-gray-700 dark:text-gray-200">{review.text}</div>
    </div>
  );
};

const MyReviews: React.FC<{ reviews: ReviewModel[] }> = ({ reviews = DUMMY_BOOKS[0].reviews }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewModel | null>(null);

  const handleCloseReview = () => setIsReviewOpen(false);

  const handleEditReview = (reviewId: string) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setSelectedReview(reviewToEdit || null);
    setIsReviewOpen(true);
  };

  const handleDeleteReview = (reviewId: string) => {
    // Add your logic to delete the review
    console.log(`Delete review with ID: ${reviewId}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-8 mt-5">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">My Reviews</h1>

      <div>{reviews.length === 0 ? <div className="text-lg text-gray-600 dark:text-gray-300">You haven't reviewed any books yet.</div> : reviews.map((review) => <ReviewItem key={review.id} review={review} onEdit={handleEditReview} onDelete={handleDeleteReview} />)}</div>

      {/* Add or Edit Review Modal */}
      {isReviewOpen && selectedReview && (
        <Dialog open={isReviewOpen} onClose={handleCloseReview} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
              <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{selectedReview ? "Edit Your Review" : "Add Your Review"}</DialogTitle>

              <form className="mt-6 space-y-6">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Rating
                  </label>
                  <select id="rating" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-1 py-2" defaultValue={selectedReview?.rating || 1}>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Review
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    placeholder="Write your review here..."
                    defaultValue={selectedReview?.text || ""}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm resize-none px-2 py-2"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button type="button" className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300" onClick={handleCloseReview}>
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                    {selectedReview ? "Update Review" : "Submit Review"}
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

export default MyReviews;
