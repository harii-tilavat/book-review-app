import React from "react";
import { ReviewModel } from "../_models/BookModel";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/16/solid";
import { useAuth } from "../context/AuthContext";
import Rating from "./comman/Rating";

interface ReviewProps {
  review: ReviewModel;
  onEdit: (reivewId: string) => void;
  onDelete: (reivewId: string) => void;
}

const ReviewItem: React.FC<ReviewProps> = ({ review, onDelete, onEdit }) => {
  // const {} = useAuth
  const isMyReview = false;
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md flex items-start space-x-4">
      {/* Avatar Placeholder */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold">{review.user?.username[0].toUpperCase()}</div>
      </div>

      {/* Review Content */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.user?.username}</h3>
          <Rating rating={review.rating}/>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
      </div>
      {/* Edit/Delete Buttons for User's Own Review */}
      {isMyReview && (
        <div className="flex space-x-2 mt-1">
          <button className="text-blue-500 hover:text-blue-700 transition" onClick={() => onEdit(review.id)} aria-label="Edit Review">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="text-red-500 hover:text-red-700 transition" onClick={() => onDelete(review.id)} aria-label="Delete Review">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
