import { useNavigate } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import { PaginationModel } from "../../models/PaginationModel";
import {  FilterModel } from "../../models/BookModel";
import BookManagementHeader from "./BookManagementHeader";
import useBookStore from "../../store/useBookStore";
import BookList from "./BookList";

interface BookManagementProps {
  isMyBooks: boolean;
}

const BookManagement: React.FC<BookManagementProps> = ({ isMyBooks = false }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterModel>(new FilterModel());
  const [paginationState, setPaginationState] = useState<PaginationModel>(new PaginationModel());
  const { deleteBook, isLoading: isDeleteLoading } = useBookStore(); // Pending...

  const { getAllBooks, booksData, isLoading } = useBookStore();
  useEffect(() => {
    const fetchBooks = async () => {
      await getAllBooks(paginationState, isMyBooks, filters);
      setPaginationState((prevState) => ({ ...prevState, totalPages: booksData.totalPages }));
    };
    fetchBooks();
  }, [paginationState.page, paginationState.itemsPerPage, filters, booksData.totalPages]);

  function handlePageChange(newPage: number) {
    setPaginationState((prevState) => ({ ...prevState, page: newPage }));
  }
  function handleFilterChange(event: FormEvent, identifier: string) {
    setFilters((prev) => ({ ...prev, [identifier]: (event.target as any).value }));
  }
  async function handleDeleteBook(bookId: string) {
    if (bookId) {
      await deleteBook(bookId);
    }
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

            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold" onClick={() => navigate("/add-draft")}>
              Create draft
            </button>
          </div>
        </div>
      )}

      <div className="book-list-wrapper">
        {/* Book Management Section */}

        <BookManagementHeader onFilterChange={handleFilterChange} />

        <BookList books={booksData.items} isLoading={isLoading} isDeleteLoading={isDeleteLoading} isMyBooks={isMyBooks} pagination={paginationState} onPageChange={handlePageChange} onDeleteBook={handleDeleteBook} />
      </div>
    </div>
  );
};

export default BookManagement;
