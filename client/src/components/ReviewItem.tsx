import React from "react";
import { ReviewModel } from "../models/BookModel";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ReviewProps {
  review: ReviewModel;
  onEdit: () => void;
  onDelete: () => void;
}

const ReviewItem: React.FC<ReviewProps> = ({ review, onDelete, onEdit }) => {
  const isMyReview = false;
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md flex items-start space-x-4">
      {/* Avatar Placeholder */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold">{review.user[0].toUpperCase()}</div>
      </div>

      {/* Review Content */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.user}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) => (
              <StarIcon key={idx} className={`h-5 w-5 ${idx < review.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
      </div>
      {/* Edit/Delete Buttons for User's Own Review */}
      {isMyReview && (
        <div className="flex space-x-2 mt-1">
          <button className="text-blue-500 hover:text-blue-700 transition" onClick={onEdit} aria-label="Edit Review">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="text-red-500 hover:text-red-700 transition" onClick={onDelete} aria-label="Delete Review">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
