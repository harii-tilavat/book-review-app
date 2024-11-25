import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextBox from "../components/comman/TextBox";
import Button from "../components/comman/Button";
import { BookModel } from "../_models/BookModel";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import bookApi from "../api/bookApi";
import GenreModel from "../_models/GenreModel";

export interface BookFormValues {
  title: string;
  author: string;
  cover: File | null | string;
  isbn: string;
  genreId: string;
  description?: string;
}
interface BookFormProps {
  bookDetail?: BookModel;
  onSubmit: (book: FormData) => void;
  isLoading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ bookDetail, onSubmit, isLoading }) => {
  const [genre, setGenre] = useState<Array<GenreModel>>([]);
  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
    setValue,
  } = useForm<BookFormValues>({
    defaultValues: {
      title: bookDetail?.title || "",
      author: bookDetail?.author || "",
      cover: null,
      isbn: bookDetail?.isbn || "",
      genreId: bookDetail?.genreId || "",
      description: bookDetail?.description || "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookDetail?.cover) {
      // If cover available means it is edit form.
      setImagePreview(bookDetail.cover);
      setValue("cover", bookDetail.cover); // Set the value for cover if it's an edit
    }
  }, [bookDetail, setValue]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const genreList = await bookApi.getAllGenre();
        setGenre(genreList);
        setValue("genreId", bookDetail?.genreId || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue("cover", file);
        trigger("cover"); // Manually trigger validation for "cover"
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null); // Reset image preview
    setValue("cover", null);
    trigger("cover"); // Manually trigger validation for "cover"

    // Clear the input file value to allow selecting the same file again
    const fileInput = document.getElementById("cover") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  // Prepare FormData object
  const prepareFormData = (data: BookFormValues): FormData => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("genreId", data.genreId);
    formData.append("description", data.description || "");
    formData.append("isbn", data.isbn || "");
    if (data.cover) {
      if (typeof data.cover !== "string") {
        formData.append("file", data.cover);
      } else {
        formData.append("cover", data.cover);
      }
    }
    if (bookDetail?.id) {
      formData.append("id", bookDetail.id);
    }
    return formData;
  };
  const handleSubmitForm: SubmitHandler<BookFormValues> = (book: BookFormValues) => {
    const formData = prepareFormData(book);
    onSubmit(formData);
  };
  const handleResetForm = () => {
    reset({ author: bookDetail?.author || "", title: bookDetail?.title || "", isbn: bookDetail?.isbn || "", genreId: bookDetail?.genre.id || "", cover: bookDetail?.cover || null });
    if (bookDetail) {
      setImagePreview(bookDetail.cover);
      return;
    }
    handleRemoveImage();
  };
  return (
    <>
      <div className="max-w-6xl mx-auto py-4">
        <button
          onClick={() => navigate("/")} // Replace with your route or navigation logic
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
          Back to Book List
        </button>
        <div className="form-container-wrapper bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6"> {bookDetail ? "Edit Book" : "Add a New Book"}</h1>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            {/* Title */}
            <TextBox id="title" label="Title" placeholder="Enter book title" error={errors.title} register={register("title", { required: "Title is required" })} />

            {/* Author */}
            <TextBox id="author" label="Author" placeholder="Enter author name" error={errors.author} register={register("author", { required: "Author is required" })} />

            {/* Cover Image */}
            <div>
              <div className={clsx("form-input-wrapper", imagePreview && "hidden")}>
                <label htmlFor="cover" className="block text-sm font-medium text-gray-700 dark:text-gray-100 ">
                  Cover Image
                </label>
                <Controller
                  name="cover"
                  control={control}
                  rules={{ required: "Cover image is required" }} // Validates that the cover image is selected
                  render={() => <input id="cover" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 w-full border rounded-md border-blue-300 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-100" />}
                />
              </div>
              {/* JSX for remove button, shown only if imagePreview exists */}
              {imagePreview && (
                <div className="mt-2 flex items-center space-x-4">
                  <img src={imagePreview} alt="Cover preview" className="max-w-xs rounded-md" />
                  <button type="button" onClick={handleRemoveImage} className="text-red-500 hover:text-red-600 font-semibold">
                    Remove Image
                  </button>
                </div>
              )}
              {errors.cover && <p className="text-red-500 text-sm">{errors.cover.message}</p>}
            </div>

            {/* ISBN */}
            <TextBox id="isbn" label="ISBN" placeholder="Enter ISBN number" error={errors.isbn} register={register("isbn", { required: "ISBN is required" })} />

            {/* Genre */}
            <div className="mb-4">
              <label htmlFor={"genre"} className="block text-gray-700 dark:text-gray-100 font-semibold text-sm">
                Genre
              </label>
              <select id={"genre"} className="block w-full rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2" {...register("genreId", { required: "Genre is required" })}>
                <option value="">Select...</option>
                {genre.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.genreId && <p className="text-red-500 text-sm">{errors.genreId.message}</p>}
            </div>
            {/* Description */}
            <TextBox id="description" label="Description" placeholder="Enter description" error={errors.isbn} register={register("description")} isTextArea />

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button type="button" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 font-semibold" onClick={handleResetForm}>
                Reset
              </button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <ArrowPathIcon className="h-5 w-5 text-white animate-spin" />
                    <span>{bookDetail ? "Updating Book..." : "Adding Book..."}</span>
                  </div>
                ) : bookDetail ? (
                  "Update Book"
                ) : (
                  "Add Book"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookForm;
