import BookForm, { BookFormValues } from "../components/BookForm";
const AddBookPage: React.FC = () => {
  function handleSubmit(book: BookFormValues) {
    console.log("FORM SUBMITTED : ", book);
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBookPage;
