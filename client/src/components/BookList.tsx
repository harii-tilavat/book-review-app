import BookCard from "./BookCard";
import { BookModel } from "../_models/BookModel";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./comman/Button";
import LoadingCard from "./comman/LoadingCard";
import bookApi from "../api/bookApi";

const BookList = ({ books = [], isLoading, isMyBooks }: { books: Array<BookModel>; isLoading: boolean; isMyBooks: boolean }) => {
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
  async function deleteBook() {
    const { message } = await bookApi.deleteBook(bookId);
    toast.success(message || "Book deleted successfully");
    closeDeleteModal();
    navigate("/"); // Redirect to book list or home
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
          {isLoading && [1, 2, 3, 4].map((i) => <LoadingCard key={i} />)}
          {!isLoading && books.map((book: BookModel) => <BookCard key={book.id} book={book} onDelete={openDeleteModal} showActions={isMyBooks} />)}
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
    </>
  );
};

export default BookList;
