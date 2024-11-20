import React from "react";
import BookForm, { BookFormValues } from "../components/BookForm";
import { DUMMY_BOOKS } from "../utils/constants";
import { useParams } from "react-router-dom";

const EditBookPage = () => {
  const params = useParams<{ id: string }>();
  const bookDetail = DUMMY_BOOKS.find((b) => b.id === params["id"]);
  function handleSubmit(book: BookFormValues) {
    console.log("FORM SUBMITTED : ", book);
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} bookDetail={bookDetail} />
    </div>
  );
};

export default EditBookPage;
