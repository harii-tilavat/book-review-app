import React, { useEffect, useState } from "react";
import { ReviewModel } from "../../models/BookModel";
import { useReviewApi } from "../../hooks/useReviewApi";
import ReviewFormModal, { ReviewFormValues } from "../../components/comman/ReviewFormModal";
import { useModal } from "../../context/ModalContext";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import ReviewItem from "../../components/ReviewItem";
const MyReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Array<ReviewModel>>([]);
  const { getMyReviews, isLoading, updateReview, deleteReview } = useReviewApi();
  const { showModal } = useModal();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewModel | null>(null);

  const handleCloseReview = () => setIsReviewOpen(false);
  const handleEditReview = (reviewId: string) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setSelectedReview(reviewToEdit || null);
    setIsReviewOpen(true);
  };
  const openDeleteModal = (reviewId: string) => {
    // showModal
    showModal({
      title: "Delete Review",
      description: "Are you sure you want to delete this review? This action cannot be undone.",
      confirmLabel: "Yes, Delete",
      isLoading,
      loadingText: "Deleting...",
      cancelLabel: "Cancel",
      confirmType: "danger",
      onConfirm: () => handleDeleteReview(reviewId),
    });
  };
  const handleDeleteReview = async (reviewId: string) => {
    // Add your logic to delete the review
    try {
      if (reviewId) {
        await deleteReview(reviewId);
        setReviews((prevReviews) => {
          return [...prevReviews.filter((r) => r.id !== reviewId)];
        });
      } else {
      }
    } catch (error) {
      console.log(`Delete not success review with ID: ${reviewId}`, error);
    }
  };

  const handleSubmitReview = async (reviewData: ReviewFormValues) => {
    if (selectedReview) {
      const updatedReview = await updateReview({ ...reviewData, bookId: selectedReview.bookId, id: selectedReview.id } as ReviewModel);
      setReviews((prevReviews) => {
        const index = prevReviews.findIndex((r) => r.id === selectedReview.id);
        const updatedReviews = [...prevReviews];
        updatedReviews[index] = updatedReview;
        return updatedReviews;
      });
      handleCloseReview();
    }
  };
  useEffect(() => {
    async function fethcReviews() {
      const myReviews = await getMyReviews();
      setReviews(myReviews);
    }
    fethcReviews();
  }, []);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">My Reviews</h1>

      <div>{reviews.length === 0 ? <div className="text-lg text-gray-600 dark:text-gray-300">You haven't reviewed any books yet.</div> : reviews.map((review) => <ReviewItem key={review.id} review={review} onEdit={handleEditReview} onDelete={openDeleteModal} isMyReview />)}</div>

      {/* Add or Edit Review Modal */}
      {isReviewOpen && selectedReview && <ReviewFormModal isReviewOpen={isReviewOpen} selectedReview={selectedReview} onCloseReview={handleCloseReview} onSubmitReview={handleSubmitReview} isLoading={isLoading} />}
    </div>
  );
};

export default MyReviewsPage;
