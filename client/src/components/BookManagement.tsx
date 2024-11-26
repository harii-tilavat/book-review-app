import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import { DUMMY_BOOKS } from "../utils/constants";
import React, { FormEvent, useEffect, useState } from "react";
import bookApi from "../api/bookApi";
import { PaginationModel } from "../_models/PaginationModel";
import Pagination from "../components/comman/Pagination";
import { BookModel, FilterModel, sortByOptions } from "../_models/BookModel";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import LoaderSpinner from "./comman/LoaderSpinner";
import Button from "./comman/Button";

interface BookManagementProps {
  isMyBooks: boolean;
}

const BookManagement: React.FC<BookManagementProps> = ({ isMyBooks = false }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Array<BookModel>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterModel>(new FilterModel());
  console.log("FILTER : ", filters);
  const [paginationState, setPaginationState] = useState<PaginationModel>({
    itemsPerPage:8,
    page: 1,
    totalPages: 1,
  });
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await bookApi.getAllBooks<BookModel>({ itemsPerPage: paginationState.itemsPerPage, page: paginationState.page }, isMyBooks, filters);
      setBooks(response.items);
      setPaginationState((prevState) => ({ ...prevState, totalPages: response.totalPages }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
    console.log("Fetched books : ");
  }, [paginationState.page, paginationState.itemsPerPage, filters]);

  function handlePageChange(newPage: number) {
    setPaginationState((prevState) => ({ ...prevState, page: newPage }));
  }
  function handleFilterChange(event: FormEvent, identifier: string) {
    setFilters((prev) => ({ ...prev, [identifier]: (event.target as any).value }));
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
        {/* Book Management Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold">Book Management</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            {/* Filter by Genre */}
            <div>
              <label htmlFor="filter-genre" className="sr-only">
                Filter by Genre
              </label>
              <select id="filter-genre" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-64" onChange={(event) => handleFilterChange(event, "genreId")}>
                <option value="">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="sci-fi">Science Fiction</option>
                <option value="fantasy">Fantasy</option>
                {/* Add more genres as needed */}
              </select>
            </div>

            {/* Sort by Options */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <label htmlFor="sort-books" className="sr-only">
                  Select Sort By
                </label>
                <select id="sort-books" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-64" onChange={(event) => handleFilterChange(event, "sortField")}>
                  <option value="">Select Sort By</option>
                  {sortByOptions.map((option) => (
                    <option value={option.value} key={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sort-order" className="sr-only">
                  Select Order
                </label>
                <select id="sort-order" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-48" onChange={(event) => handleFilterChange(event, "sortOrder")}>
                  <option value="">Select Order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            {/* Add New Book Button */}
            <Button onClick={() => navigate("/add-book")}>Add New Book</Button>
          </div>
        </div>

        <BookList books={books} isLoading={isLoading} isMyBooks={isMyBooks} pagination={paginationState} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default BookManagement;
