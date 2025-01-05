import { toast } from "react-toastify";
import BookForm from "../../components/BookForm";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import useBookStore from "../../store/useBookStore";
const AddBookPage: React.FC = () => {
  const naviagate = useNavigate();
  const { createBook, isLoading } = useBookStore();
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
  return (
    <div className="min-h-screen pt-2 px-4">
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddBookPage;
