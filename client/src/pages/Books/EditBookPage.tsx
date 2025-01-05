import { useEffect } from "react";
import BookForm from "../../components/Books/BookForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import useBookStore from "../../store/useBookStore";

const EditBookPage = () => {
  const { isLoading, getBookById, currentBook } = useBookStore();
  const { isLoading: isUpdateLoading, updateBook } = useBookStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      if (id) {
        await getBookById(id);
      }
    }
    fetchBook();
  }, [id]);

  async function handleSubmit(formData: FormData) {
    try {
      const { message } = await updateBook(formData);
      toast.success(message);
      navigate("/book-detail/" + id);
    } catch (error: any) {
      console.log(error);
    }
  }
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (!currentBook && !isLoading) {
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
  return <div className="min-h-screen pt-2 px-4">{currentBook && <BookForm onSubmit={handleSubmit} bookDetail={currentBook} isLoading={isUpdateLoading} btnLabel="Update" btnLoadingLabel="Updating..." headerText="Edit book" />}</div>;
};

export default EditBookPage;
