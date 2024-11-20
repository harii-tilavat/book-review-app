import { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { DUMMY_BOOKS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewModel } from "../models/BookModel";
import Button from "../components/comman/Button";
import ReviewItem from "../components/ReviewItem";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const BookDetailsPage = ({}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = DUMMY_BOOKS.find((b) => b.id === params["id"]);
  const handleOpenReview = () => setIsReviewOpen(true);
  const handleCloseReview = () => setIsReviewOpen(false);
  if (!book) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Book Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find the book you were looking for. Please check the ID or try again later.</p>
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="navigate-back my-3">
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
      </div>
      {/* Book Details Section */}
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
        <img src={book.cover} alt={book.title} className="w-full lg:w-1/3 object-cover rounded-lg" />
        <div className="lg:ml-6 mt-6 lg:mt-0 flex-grow">
          <h1 className="text-3xl font-bold ">{book.title}</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-100 font-semibold">by {book.author}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            Genre: <span className="font-medium">{book.genre}</span>
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti quibusdam nobis officiis quasi. Amet neque saepe laboriosam obcaecati magnam.</p>

          {/* Rating Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold ">Rating</h2>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} className={`h-6 w-6 ${index < book!.rating ? "text-yellow-500" : "text-gray-300"}`} />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">
                {book.rating}/5 ({book.reviews.length} reviews)
              </span>
            </div>
          </div>

          {/* Add Review Button */}
          <Button onClick={handleOpenReview} className="mt-4">
            Add Your Review
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold ">Reviews</h2>
        <div className="mt-4 space-y-6">
          {book.reviews.map((review: ReviewModel, index: number) => (
            <ReviewItem review={review} key={index} onDelete={() => {}} onEdit={() => {}} />
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {isReviewOpen && (
        <Dialog open={isReviewOpen} onClose={handleCloseReview} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
              {/* Title */}
              <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add Your Review</DialogTitle>

              {/* Form */}
              <form className="mt-6 space-y-6">
                {/* Rating Field */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Rating
                  </label>
                  <select id="rating" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-1 py-2">
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                {/* Review Field */}
                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Review
                  </label>
                  <textarea id="review" rows={4} placeholder="Write your review here..." className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm resize-none px-2 py-2"></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300" onClick={handleCloseReview}>
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

export default BookDetailsPage;
