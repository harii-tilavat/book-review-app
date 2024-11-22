import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
const Home = () => {
  const navigate = useNavigate();
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

      <div className="book-list-wrapper">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
