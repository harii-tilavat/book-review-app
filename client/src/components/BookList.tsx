import BookCard from "./BookCard";
import { BookModel } from "../_models/BookModel";
import { useNavigate } from "react-router-dom";
import React from "react";
import LoadingCard from "./comman/LoadingCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Pagination from "./comman/Pagination";
import { PaginationModel } from "../_models/PaginationModel";

interface BookListProps {
  onPageChange: (newPage: number) => void;
  books: Array<BookModel>;
  isLoading: boolean;
  isMyBooks: boolean;
  pagination: PaginationModel;
}

const BookList: React.FC<BookListProps> = ({ books = [], isLoading, pagination, isMyBooks, onPageChange }) => {
  const navigate = useNavigate();

  return (
    <>
      {!books.length && !isLoading && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Books Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find {isMyBooks ? "yours" : ""} books. Please create the book</p>
          <button
            onClick={() => navigate("/add-book")} // Replace with your route or navigation logic
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
            Create book
          </button>
        </div>
      )}

      {/* Book List */}
      <div className="book-card-list">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  py-2">
          {isLoading && [...(new Array(pagination.itemsPerPage))].map((_,i) => <LoadingCard key={i} />)}
          {!isLoading && books.map((book: BookModel) => <BookCard key={book.id} book={book} showActions={isMyBooks} />)}
        </div>
      </div>
      {/* Pagination state */}
      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages || 0} onPageChange={onPageChange} />
    </>
  );
};

export default BookList;
