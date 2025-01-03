import { toast } from "react-toastify";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/comman/LoaderSpinner";
import useBookApi from "../hooks/useBookApi";
import AddPageForm from "../components/AddPageForm";
import DraftList from "../components/DraftList";
const AddBookPage: React.FC = () => {
  const naviagate = useNavigate();
  const { createBook, isLoading } = useBookApi();
  async function handleSubmit(formData: FormData) {
    try {
      const { message } = await createBook(formData);
      toast.success(message);
      naviagate("/my-books");
    } catch (error: any) {
      console.log(error);
    }
  }
  if (isLoading) {
    return <LoaderSpinner />;
  }
  function handlePageSubmit() {}
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
      <hr />
      <DraftList />
      <div className="max-w-6xl mx-auto py-4">
        <AddPageForm />
      </div>
    </div>
  );
};

export default AddBookPage;
