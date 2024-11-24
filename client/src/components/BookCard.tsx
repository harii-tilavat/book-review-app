import React from "react";
import { BookModel } from "../_models/BookModel";
import { Link, useNavigate } from "react-router-dom";

interface BookCardProps {
  onDelete?: (id: string) => void;
  showActions?: boolean;
  book: BookModel;
}
const BookCard: React.FC<BookCardProps> = ({ book, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  const { reviews } = book;
  function editBook(id: string) {
    // EDIT BOOK
    navigate("/edit-book/" + id);
  }
  function navigateToBookDetail(id: string) {
    navigate("/book-detail/" + id);
  }

  return (
    <div key={book.id} className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Book Cover */}
      <img src={book.cover} alt={book.title} className="h-48 w-full object-cover" />

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{book.title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            <span className="font-semibold">Genre:</span> {book.genre.name}
          </p>
        </div>

        {/* Rating Section */}
        {book.reviews && book.reviews.length > 0 ? (
          <div className="mt-3 flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${index < Math.round(book.avgRating) ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{book.avgRating.toFixed(1)} / 5</span>
            {/* Reviews Section */}
            {reviews && reviews.length > 0 && (
              <div className="ms-auto text-sm text-blue-500">
                <Link to={`/book-detail/${book.id}`} className="hover:underline">
                  {reviews.length} Reviews (See all)
                </Link>
              </div>
            )}
          </div>
        ) : (
          // No Reviews Found Message
          <div className="mt-3 text-gray-500 dark:text-gray-400 text-sm">No reviews available.</div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm" onClick={() => navigateToBookDetail(book.id)}>
          View Details
        </button>
        {showActions && (
          <div className="flex space-x-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600" onClick={() => editBook(book.id)}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600" onClick={() => onDelete && onDelete(book.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
