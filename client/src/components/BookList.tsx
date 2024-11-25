import BookCard from "./BookCard";
import { BookModel } from "../_models/BookModel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./comman/Button";
import LoadingCard from "./comman/LoadingCard";
import bookApi from "../api/bookApi";
import ConfirmationModal from "./comman/ConfirmationModal";

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
  async function handleDeleteBook() {
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
      <ConfirmationModal isOpen={isDeleteModalOpen} onCancel={closeDeleteModal} onConfirm={handleDeleteBook} description="This action cannot be undone. Do you really want to delete this book?" confirmLabel="Yes, Delete" cancelLabel="Cancle" />
    </>
  );
};

export default BookList;
