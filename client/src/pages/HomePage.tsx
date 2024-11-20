import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../components/comman/Button";
import { DUMMY_BOOKS } from "../utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { BookModel } from "../models/BookModel";
const Home = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");
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
            Add New Book
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold" onClick={() => navigate("/my-reviews")}>
            Explore Reviews
          </button>
        </div>
      </div>

      {/* Book Management Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Book Management</h2>
        <div className="flex space-x-4">
          <input type="text" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-transparent" placeholder="Search by title, author, or ISBN" />
          <Button>Add New Book</Button>
        </div>
      </div>

      {/* Book Cards */}
      <div className="book-card-list">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  py-2">
          {DUMMY_BOOKS.map((book: BookModel) => (
            <BookCard key={book.id} book={book} onDelete={openDeleteModal} />
          ))}
        </div>
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
    </div>
  );
};

export default Home;
