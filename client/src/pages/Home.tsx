import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../components/comman/Button";
import { DUMMY_BOOKS } from "../utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  function openDeleteModal(id: string) {
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  function handleDelete() {
    toast.success("Book deleted successfully!");
    closeDeleteModal();
  }
  // function viewReviews(id: string) {}
  function navigateToBookDetail(id: string) {
    navigate("/view-book/" + id);
  }
  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-50 dark:bg-gray-800 text-center py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to <span className="text-blue-500">BookReviewHub</span></h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Your one-stop platform for managing and discovering books. Add, edit, and explore books, and share your reviews with the community.</p>
      </div>

      <div className="flex justify-center gap-4 py-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 font-semibold">Add New Book</button>
        <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold">Explore Reviews</button>
      </div>

      {/* Search Bar and Add New Book */}
      <div className="mb-6 flex flex-col md:flex-row gap-5 justify-between md:items-center">
        <h1 className="text-3xl font-semibold">Book Management</h1>
        <div className="flex space-x-4">
          
          <input type="text" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-transparent" placeholder="Search by title, author, or ISBN" />
          {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">Add New Book</button> */}
          <Button>Add New Book</Button>
        </div>
      </div>

      {/* Book List Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium">Title</th>
              <th className="px-6 py-3 text-sm font-medium">Author</th>
              <th className="px-6 py-3 text-sm font-medium">ISBN</th>
              <th className="px-6 py-3 text-sm font-medium">Genre</th>
              <th className="px-6 py-3 text-sm font-medium">Cover</th>
              <th className="px-6 py-3 text-sm font-medium">Average Rating</th>
              <th className="px-6 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {DUMMY_BOOKS.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 text-sm">{book.title}</td>
                <td className="px-6 py-4 text-sm">{book.author}</td>
                <td className="px-6 py-4 text-sm">{book.isbn}</td>
                <td className="px-6 py-4 text-sm">{book.genre}</td>
                <td className="px-6 py-4">
                  <img src={book.cover} alt="Cover" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">
                      {Array.from({ length: Math.floor(book.rating) }).map((_, index) => (
                        <span key={index}>&#9733;</span> // Filled star
                      ))}
                      {Array.from({ length: 5 - Math.floor(book.rating) }).map((_, index) => (
                        <span key={index + 5} className="text-gray-400">
                          &#9734;
                        </span> // Empty star
                      ))}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{book.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 space-x-3 ">
                  <div className="actions flex flex-row items-center gap-4">
                    {/* Edit Button */}
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600">Edit</button>
                    {/* View Book Button */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600" onClick={() => navigateToBookDetail(book.id)}>
                      View Book
                    </button>
                    {/* Delete Button */}
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600" onClick={() => openDeleteModal(book.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <DialogTitle className="text-xl font-semibold mb-4">Are you sure you want to delete this book?</DialogTitle>
            <div className="flex space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
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
