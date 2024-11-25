import { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { BookModel, ReviewModel } from "../_models/BookModel";
import Button from "../components/comman/Button";
import ReviewItem from "../components/ReviewItem";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import bookApi from "../api/bookApi";
import { toast } from "react-toastify";
import LoadingCard from "../components/comman/LoadingCard";
import BookCard from "../components/BookCard";
import LoaderSpinner from "../components/comman/LoaderSpinner";
import ReviewFormModal, { ReviewFormValues } from "../components/comman/ReviewFormModal";
import { useAuth } from "../context/AuthContext";
import { useReviewApi } from "../hooks/useReviewApi";
const BookDetailsPage = () => {
  const [currentBook, setCurrentBook] = useState<BookModel>();
  const { currentUser } = useAuth();
  const [bookList, setBookList] = useState<Array<BookModel>>([]); // It is Recommendation book list
  const [isLoading, setIsLoading] = useState(false); // It is Recommendation book list

  const { createReview, deleteReview, isLoading: isReviewLoading } = useReviewApi();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleOpenReview = () => setIsReviewOpen(true);
  const handleCloseReview = () => setIsReviewOpen(false);
  async function fetchBook(id: string) {
    try {
      if (id) {
        setIsLoading(true);
        const { book, recommendations } = await bookApi.getBookById(id);
        setCurrentBook(book);
        setBookList(recommendations);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error((error && error.message) || "Book fetching failed!");
    }
  }
  useEffect(() => {
    if (params["id"]) {
      fetchBook(params["id"]);
    }
  }, [params["id"]]);

  function handleDeleteBook(id: string) {
    //
  }
  async function handleSubmitReview(data: ReviewFormValues) {
    if (currentBook?.id) {
      const reviewData = { ...data, bookId: currentBook.id };
      const createdReview = await createReview(reviewData as ReviewModel);

      // Update the current book's reviews
      setCurrentBook((prevBook) => {
        if (!prevBook) return prevBook;
        return {
          ...prevBook,
          reviews: [...prevBook.reviews, createdReview],
        };
      });
      console.log(data);
    }
  }
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (!currentBook) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Book Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find the book you were looking for. Please check the ID or try again later.</p>
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="navigate-back my-3">
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
      </div>
      {/* Book Details Section */}
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
        <img src={currentBook.cover} alt={currentBook.title} className="w-full lg:w-1/3 object-cover rounded-lg" />
        <div className="lg:ml-6 mt-6 lg:mt-0 flex-grow">
          <h1 className="text-3xl font-bold ">{currentBook.title}</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-100 font-semibold">by {currentBook.author}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            Genre: <span className="font-medium">{currentBook.genre.name}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            ISBN: <span className="font-medium">{currentBook.isbn}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            Added On: <span className="font-medium">{new Date(currentBook.createdAt).toLocaleDateString()}</span>
          </p>
          {currentBook.description && <p className="mt-4 text-gray-700 dark:text-gray-100">{currentBook.description}</p>}

          {/* Rating Section */}
          <div className="mt-6">
            {currentBook.reviews && currentBook.reviews.length > 0 && (
              <>
                <h2 className="text-xl font-semibold ">Average Rating</h2>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} className={`h-6 w-6 ${index < currentBook.avgRating ? "text-yellow-500" : "text-gray-300"}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">
                    {currentBook.avgRating}/5 ({currentBook.reviews.length} Reviews)
                  </span>
                </div>
              </>
            )}
          </div>

          {currentUser && (
            <>
              {/* Buttons Section */}
              {currentBook.userId === currentUser.id && (
                <div className="mt-6 flex space-x-4">
                  <Button onClick={() => navigate(`/edit-book/${currentBook.id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md shadow">
                    Edit Book
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this book?")) {
                        handleDeleteBook(currentBook.id); // Replace with your delete logic
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow"
                  >
                    Delete Book
                  </Button>
                </div>
              )}

              {/* Add Review Button */}
              <Button onClick={handleOpenReview} className="mt-4">
                Add Your Review
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Recommendation Section */}
      {bookList && bookList.length > 0 && (
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-4">Recommendation</h1>
          <div className="book-card-list">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  py-2">
              {isLoading && [1, 2, 3, 4].map((i) => <LoadingCard key={i} />)}
              {!isLoading && bookList.map((book: BookModel) => <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </div>
      )}

      {/* Book Reviews Section */}
      <div className="mt-10">
        {currentBook.reviews && currentBook.reviews.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold ">Reviews</h2>
            <div className="mt-4 space-y-6">{currentBook.reviews && currentBook.reviews.map((review: ReviewModel, index: number) => <ReviewItem review={review} key={index} onDelete={() => {}} onEdit={() => {}} />)}</div>
          </>
        ) : (
          <p className="text-center font-semibold">No reviews available for this book.</p>
        )}
      </div>
      {/* Add Review Modal */}
      {false && (
        <Dialog open={isReviewOpen} onClose={handleCloseReview} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
              {/* Title */}
              <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add Your Review</DialogTitle>

              {/* Form */}
              <form className="mt-6 space-y-6">
                {/* Rating Field */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Rating
                  </label>
                  <select id="rating" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-1 py-2">
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                {/* Review Field */}
                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Review
                  </label>
                  <textarea id="review" rows={4} placeholder="Write your review here..." className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm resize-none px-2 py-2"></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300" onClick={handleCloseReview}>
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
      {isReviewOpen && <ReviewFormModal isReviewOpen={isReviewOpen} onCloseReview={handleCloseReview} onSubmitReview={handleSubmitReview} isLoading/>}
    </div>
  );
};

export default BookDetailsPage;
