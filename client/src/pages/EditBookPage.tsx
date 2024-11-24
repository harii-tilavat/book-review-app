import React, { useEffect, useState } from "react";
import BookForm, { BookFormValues } from "../components/BookForm";
import { DUMMY_BOOKS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import bookApi from "../api/bookApi";
import { toast } from "react-toastify";
import { BookModel } from "../_models/BookModel";
import LoaderSpinner from "../components/comman/LoaderSpinner";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const EditBookPage = () => {
  const [currentBook, setCurrentBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  async function fetchBook(id: string) {
    try {
      if (id) {
        const { book } = await bookApi.getBookById(id);
        setCurrentBook(book);
      }
    } catch (error: any) {
      toast.error((error && error.message) || "Book fetching failed!");
    }
  }
  useEffect(() => {
    if (params["id"]) {
      fetchBook(params["id"]);
    }
  }, [params["id"]]);

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      const { message } = await bookApi.updateBook(formData);
      toast.success(message);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      toast.error((error && error.message) || "Book not created. Try again.");
      setIsLoading(false);
      console.log(error);
    }
  }
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (!currentBook) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-2 px-4">
      <BookForm onSubmit={handleSubmit} bookDetail={currentBook} isLoading={isLoading} />
    </div>
  );
};

export default EditBookPage;
