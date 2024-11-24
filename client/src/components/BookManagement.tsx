import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import { DUMMY_BOOKS } from "../utils/constants";
import React, { useEffect, useState } from "react";
import bookApi from "../api/bookApi";
import { PaginationModel } from "../_models/PaginationModel";
import Pagination from "../components/comman/Pagination";
import { BookModel } from "../_models/BookModel";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import LoaderSpinner from "./comman/LoaderSpinner";

interface BookManagementProps {
  isMyBooks: boolean;
}

const BookManagement: React.FC<BookManagementProps> = ({ isMyBooks = false }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Array<BookModel>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationModel>({
    itemsPerPage: 8,
    page: 1,
    totalPages: 1,
  });
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await bookApi.getAllBooks<BookModel>({ itemsPerPage: paginationState.itemsPerPage, page: paginationState.page }, isMyBooks);
      setBooks(response.items);
      setPaginationState((prevState) => ({ ...prevState, totalPages: response.totalPages }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [paginationState.page, paginationState.itemsPerPage]);
  
  function handlePageChange(newPage: number) {
    setPaginationState((prevState) => ({ ...prevState, page: newPage }));
  }

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!books.length) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Books Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find {isMyBooks ? "yours" : ""} books. Please create the book</p>
        <button
          onClick={() => navigate("/add-book")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4">
          <PlusCircleIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Create book
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6">
      {/* Landing Section */}
      {!isMyBooks && (
        <div className="bg-gray-50 dark:bg-gray-800 text-center py-8 px-4 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="text-blue-500">BookReviewHub</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Your one-stop platform for managing and discovering books. Add, edit, and explore books, and share your reviews with the community.</p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 font-semibold" onClick={() => navigate("/add-book")}>
              {/* <PlusCircleIcon /> */}
              <span>Create book</span>
            </button>
            {isMyBooks && (
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold" onClick={() => navigate("/my-reviews")}>
                Explore Reviews
              </button>
            )}
          </div>
        </div>
      )}

      <div className="book-list-wrapper">
        <BookList books={books} isLoading={isLoading} isMyBooks={isMyBooks} />
        <Pagination currentPage={paginationState.page} totalPages={paginationState.totalPages || 10} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default BookManagement;
