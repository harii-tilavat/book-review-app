import { toast } from "react-toastify";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/comman/LoaderSpinner";
import useBookApi from "../hooks/useBookApi";
import AddPageForm, { PageData } from "../components/AddPageForm";
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
  function handlePageSubmit(page: PageData) {
    console.log("PAGE : ", page);
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
      <hr />
      <div className="max-w-6xl mx-auto py-4">
        <AddPageForm onPageSubmit={handlePageSubmit} />
      </div>
    </div>
  );
};

export default AddBookPage;
