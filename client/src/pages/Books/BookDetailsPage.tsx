import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookModel, ReviewModel } from "../../models/BookModel";
import Button from "../../components/comman/Button";
import ReviewItem from "../../components/ReviewItem";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import LoadingCard from "../../components/comman/LoadingCard";
import BookCard from "../../components/BookCard";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import ReviewFormModal, { ReviewFormValues } from "../../components/comman/ReviewFormModal";
import { useAuth } from "../../context/AuthContext";
import Rating from "../../components/comman/Rating";
import { formatDate } from "../../utils/helpers";
import { useModal } from "../../context/ModalContext";
import { toast } from "react-toastify";
import DraftViewer from "../../components/DraftViewer";
import useBookStore from "../../store/useBookStore";
import { useReviewStore } from "../../store/useReviewStore";
const BookDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showBooks, setShowBooks] = useState(true);

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { currentUser } = useAuth();
  const { createReview, isLoading: isReviewLoading } = useReviewStore();

  const { getBookById, isLoading: isBookLoading, recommendations, currentBook } = useBookStore();
  const { deleteBook, isLoading: isDeleteLoading } = useBookStore();
  const { showModal } = useModal();

  // Methods
  const handleOpenReview = () => setIsReviewOpen(true);
  const handleCloseReview = () => setIsReviewOpen(false);

  useEffect(() => {
    if (params["id"]) {
      getBookById(params["id"]);
    }
  }, [params["id"]]);

  function openDeleteModal(bookId: string) {
    // showModal
    console.log(bookId);
    showModal({
      title: "Delete Book",
      description: "Are you sure you want to delete this book? This action cannot be undone.",
      confirmLabel: "Yes, Delete",
      isLoading: isDeleteLoading,
      loadingText: "Deleting...",
      cancelLabel: "Cancel",
      confirmType: "danger",
      onConfirm: () => handleDeleteBook(bookId),
    });
  }
  async function handleDeleteBook(bookId: string) {
    try {
      if (bookId) {
        const { message } = await deleteBook(bookId);
        toast.success(message || "Book deleted successfully.");
        navigate("/");
      } else {
      }
    } catch (error) {
      console.log(`Delete not success review with ID: ${bookId}`, error);
    }
  }

  async function handleSubmitReview(data: ReviewFormValues) {
    if (currentBook?.id) {
      const reviewData = { ...data, bookId: currentBook.id };
      await createReview(reviewData as ReviewModel);
      handleCloseReview();
    }
  }
  if (isBookLoading || isDeleteLoading) {
    return <LoaderSpinner />;
  }
  if (!currentBook) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-5">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Book Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find the book you were looking for. Please check the ID or try again later.</p>
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4">
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
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm">
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
      </div>
      {/* Book Details Section */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <img src={currentBook.cover} alt={currentBook.title} className="w-full lg:w-1/3 object-cover rounded-lg" />
        <div className="md:ml-6 mt-6 md:mt-0 flex-grow">
          <h1 className="text-3xl font-bold ">{currentBook.title}</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-100 font-semibold">by {currentBook.author}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            Genre: <span className="font-medium">{currentBook.genre.name}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            ISBN: <span className="font-medium">{currentBook.isbn}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 font-medium">
            Added On: <span className="font-medium">{formatDate(currentBook.createdAt)}</span>
          </p>
          {currentBook.description && <p className="mt-4 text-gray-700 dark:text-gray-100">{currentBook.description}</p>}

          {/* Rating Section */}
          <div className="mt-6">
            {currentBook.reviews && currentBook.reviews.length > 0 && (
              <>
                <h2 className="text-xl font-semibold ">Average Rating</h2>
                <div className="flex items-center mt-2">
                  <Rating rating={currentBook.avgRating} />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">
                    {currentBook.avgRating}/5 ({currentBook.reviews.length} Reviews)
                  </span>
                </div>
              </>
            )}
          </div>

          {currentUser && (
            <>
              {/* Buttons Section - Edit and Delete Book */}
              {currentBook.userId === currentUser.id && (
                <div className="mt-6 flex space-x-4 justify-center md:justify-start">
                  <Button onClick={() => navigate(`/edit-book/${currentBook.id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-200" aria-label="Edit this book">
                    Edit Book
                  </Button>
                  <Button onClick={() => openDeleteModal(currentBook.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-200" aria-label="Delete this book">
                    Delete Book
                  </Button>
                  <Button onClick={handleOpenReview} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-200" aria-label="Add your review">
                    Add Your Review
                  </Button>
                </div>
              )}
              {/* Show/Hide Pages Button */}
              {currentBook.draft && currentBook.draft.pages.length > 0 && (
                <div className="mt-4">
                  <Button onClick={() => setShowBooks((isShow) => !isShow)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-200" aria-label={showBooks ? "Hide book pages" : "Show book pages"}>
                    {showBooks ? "Hide" : "Show"} Pages
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Draft viewer */}
      {currentBook.draft && currentBook.draft.pages.length > 0 && <div className="draft-view-container my-4 flex flex-col gap-4 items-center">{currentBook.draft && showBooks && <DraftViewer pages={currentBook.draft.pages} label="All pages" />}</div>}

      {/* Recommendation Section */}
      {recommendations.length > 0 && (
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-4">Recommendation</h1>
          <div className="book-card-list">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  py-2">
              {isBookLoading && [1, 2, 3, 4].map((i) => <LoadingCard key={i} />)}
              {!isBookLoading && recommendations.map((book: BookModel) => <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </div>
      )}

      {/* Book Reviews Section */}
      <div className="mt-10">
        {currentBook.reviews && currentBook.reviews.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold ">Reviews</h2>
            <div className="mt-4 space-y-6">{currentBook.reviews && currentBook.reviews.map((review: ReviewModel, index: number) => <ReviewItem review={review} key={index} />)}</div>
          </>
        ) : (
          <p className="text-center font-semibold">No reviews available for this book.</p>
        )}
      </div>
      {/* Add Review Modal */}
      {isReviewOpen && <ReviewFormModal isReviewOpen={isReviewOpen} onCloseReview={handleCloseReview} onSubmitReview={handleSubmitReview} isLoading={isReviewLoading} />}
    </div>
  );
};

export default BookDetailsPage;
