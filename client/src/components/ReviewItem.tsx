import React from "react";
import { ReviewModel } from "../models/BookModel";
import Rating from "./comman/Rating";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

interface ReviewProps {
  isMyReview?: boolean;
  review: ReviewModel;
  onEdit?: (reivewId: string) => void;
  onDelete?: (reivewId: string) => void;
}

const ReviewItem: React.FC<ReviewProps> = ({ isMyReview = false, review, onDelete = () => {}, onEdit = () => {} }) => {
  const navigate = useNavigate();
  return (
    <>
      {isMyReview && (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row">
          {/* Book Cover */}
          <img
            src={review.book?.cover || "/placeholder-book-cover.jpg"} // Placeholder if no cover image
            alt={review.book?.title || "Book Cover"}
            className="w-20 h-28 rounded-md object-cover sm:mr-4"
          />

          <div className="flex-grow">
            {/* Book Title */}
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.book?.title || "Unknown Book"}</div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button onClick={() => onEdit(review.id)} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Edit
                </button>
                <button onClick={() => onDelete(review.id)} className="text-red-600 dark:text-red-400 hover:underline">
                  Delete
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <Rating rating={review.rating} />
              <div className="text-gray-500 dark:text-gray-300">({review.rating} stars)</div>
            </div>

            {/* Review Text */}
            <div className="mt-4 text-gray-700 dark:text-gray-200">{review.text}</div>

            {/* Date and View Button */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-300">
              <div>Reviewed on: {formatDate(review.createdAt!)}</div>
              <button onClick={() => navigate(`/book-detail/${review.book?.id}`)} className="text-blue-600 dark:text-blue-400 hover:underline">
                View Book
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMyReview && (
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md flex items-start space-x-4 ">
          {/* Avatar Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold">{review.user?.username[0].toUpperCase()}</div>
          </div>

          {/* Review Content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.user?.username}</h3>
              <Rating rating={review.rating} />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-bold">{formatDate(review.createdAt || "")}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewItem;
