import React, { useEffect, useState } from "react";
import { ReviewModel } from "../../models/BookModel";
import ReviewFormModal, { ReviewFormValues } from "../../components/comman/ReviewFormModal";
import { useModal } from "../../context/ModalContext";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import ReviewItem from "../../components/ReviewItem";
import { useReviewStore } from "../../store/useReviewStore";
const MyReviewsPage: React.FC = () => {
  // const [reviews, setReviews] = useState<Array<ReviewModel>>([]);
  const { showModal } = useModal();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { myReviews, getMyReviews, isLoading, deleteReview, updateReview, currentReview, setCurrentReview } = useReviewStore();

  const handleCloseReview = () => setIsReviewOpen(false);
  const handleEditReview = (reviewId: string) => {
    const reviewToEdit = myReviews.find((review) => review.id === reviewId);
    setCurrentReview(reviewToEdit || null);
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
    deleteReview(reviewId);
  };

  const handleSubmitReview = async (reviewData: ReviewFormValues) => {
    if (currentReview) {
      await updateReview({ ...reviewData, bookId: currentReview.bookId, id: currentReview.id } as ReviewModel);

      handleCloseReview();
    }
  };
  useEffect(() => {
    getMyReviews();
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-5">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">My Reviews</h1>

      <div>{myReviews.length === 0 ? <div className="text-lg text-gray-600 dark:text-gray-300">You haven't reviewed any books yet.</div> : myReviews.map((review) => <ReviewItem key={review.id} review={review} onEdit={handleEditReview} onDelete={openDeleteModal} isMyReview />)}</div>

      {/* Add or Edit Review Modal */}
      {isReviewOpen && currentReview && <ReviewFormModal isReviewOpen={isReviewOpen} selectedReview={currentReview} onCloseReview={handleCloseReview} onSubmitReview={handleSubmitReview} isLoading={isLoading} />}
    </div>
  );
};

export default MyReviewsPage;
