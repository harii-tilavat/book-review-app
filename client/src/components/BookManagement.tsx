import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import { DUMMY_BOOKS } from "../utils/constants";
import React, { useEffect, useState } from "react";
import bookApi from "../api/bookApi";
import { PaginationModel } from "../_models/PaginationModel";
import Pagination from "../components/comman/Pagination";
import { BookModel } from "../_models/BookModel";

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
      const response = await bookApi.getAllBooks<BookModel>({ itemsPerPage: paginationState.itemsPerPage, page: paginationState.page });
      setBooks(response.items);
      setPaginationState((prevState) => ({ ...prevState, totalPages: response.totalPages }));
      setIsLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBooks();
  }, [paginationState.page, paginationState.itemsPerPage]);
  function handlePageChange(newPage: number) {
    console.log("NEW PAGE : ", newPage);
    setPaginationState((prevState) => ({ ...prevState, page: newPage }));
  }
  return (
    <div className="container mx-auto p-6">
      {/* Landing Section */}
      <div className="bg-gray-50 dark:bg-gray-800 text-center py-8 px-4 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Welcome to <span className="text-blue-500">BookReviewHub</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Your one-stop platform for managing and discovering books. Add, edit, and explore books, and share your reviews with the community.</p>
        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 font-semibold" onClick={() => navigate("/add-book")}>
          Average Rating
          </button>
          {isMyBooks && (
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold" onClick={() => navigate("/my-reviews")}>
              Explore Reviews
            </button>
          )}
        </div>
      </div>

      <div className="book-list-wrapper">
        <BookList books={books} isLoading={isLoading} />
        <Pagination currentPage={paginationState.page} totalPages={paginationState.totalPages || 10} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default BookManagement;
