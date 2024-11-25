import { toast } from "react-toastify";
import bookApi from "../api/bookApi";
import BookForm, { BookFormValues } from "../components/BookForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/comman/LoaderSpinner";
const AddBookPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const naviagate = useNavigate();
  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      const { message } = await bookApi.createBook(formData);
      toast.success(message);
      setIsLoading(false);
      naviagate("/");
    } catch (error: any) {
      toast.error((error && error.message) || "Book not created. Try again.");
      console.log(error);
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddBookPage;
