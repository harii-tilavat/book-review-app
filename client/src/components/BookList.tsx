import BookCard from "./BookCard";
import { BookModel } from "../models/BookModel";
import { DUMMY_BOOKS } from "../utils/constants";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./comman/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const BookList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;
  const navigate = useNavigate();

  function openDeleteModal(id: string) {
    setIsDeleteModalOpen(true);
    setBookId(id);
  }
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setBookId("");
  }
  function deleteBook() {
    toast.success(bookId + "Book deleted successfully");
    closeDeleteModal();
  }
  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Fetch books for the new page from the server
      console.log(`Fetching page ${newPage}`);
    }
  }
  return (
    <>
      {/* Book Management Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Book Management</h2>
        <div className="flex space-x-4">
          <input type="text" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-transparent" placeholder="Search by title, author, or ISBN" />
          <Button onClick={() => navigate("/add-book")}>Add New Book</Button>
        </div>
      </div>

      {/* Book List */}
      <div className="book-card-list">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  py-2">
          {DUMMY_BOOKS.map((book: BookModel) => (
            <BookCard key={book.id} book={book} onDelete={openDeleteModal} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex shadow-sm" aria-label="Pagination">
          {/* Previous Button */}
          <button
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === page ? "text-white bg-blue-600" : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"} border border-gray-300 dark:border-gray-600`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <DialogTitle className="text-xl font-semibold mb-4">Are you sure you want to delete this book?</DialogTitle>
            <div className="flex space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deleteBook}>
                Yes, Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default BookList;
