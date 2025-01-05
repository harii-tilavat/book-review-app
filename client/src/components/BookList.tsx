import BookCard from "./BookCard";
import { BookModel } from "../models/BookModel";
import { useNavigate } from "react-router-dom";
import React from "react";
import LoadingCard from "./comman/LoadingCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Pagination from "./comman/Pagination";
import { PaginationModel } from "../models/PaginationModel";
import { useModal } from "../context/ModalContext";

interface BookListProps {
  onPageChange: (newPage: number) => void;
  onDeleteBook: (bookId: string) => void;
  books: Array<BookModel>;
  isLoading: boolean;
  isDeleteLoading: boolean;
  isMyBooks: boolean;
  pagination: PaginationModel;
}

const BookList: React.FC<BookListProps> = ({ books = [], isLoading, isDeleteLoading, pagination, isMyBooks, onPageChange, onDeleteBook }) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  function openDeleteModal(bookId: string) {
    // showModal
    showModal({
      title: "Delete Book",
      description: "Are you sure you want to delete this book? This action cannot be undone.",
      confirmLabel: "Yes, Delete",
      cancelLabel: "Cancel",
      confirmType: "danger",
      onConfirm: () => onDeleteBook(bookId),
    });
  }
  return (
    <>
      {!books.length && !isLoading && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  py-2">
          {(isLoading || isDeleteLoading) && [...new Array(pagination.itemsPerPage)].map((_, i) => <LoadingCard key={i} />)}
          {!isLoading && !isDeleteLoading && books.map((book: BookModel) => <BookCard key={book.id} book={book} showActions={isMyBooks} onDelete={openDeleteModal} />)}
        </div>
      </div>
      {/* Pagination state */}
      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages || 0} onPageChange={onPageChange} />
    </>
  );
};

export default BookList;
