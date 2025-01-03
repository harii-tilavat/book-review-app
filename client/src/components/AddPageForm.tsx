import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextBox from "./comman/TextBox";

type PageType = "index" | "title" | "content";

export interface PageData {
  type: PageType;
  content: string;
  title?: string; // Only for Title page
  chapterTitle?: string; // Only for Content page
}

interface AddPageFormProps {
  onPageSubmit: (page: PageData) => void;
}

const AddPageForm: React.FC<AddPageFormProps> = ({ onPageSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedPageType, setSelectedPageType] = useState<PageType>("index");

  const onSubmit = (data: any) => {
    const pageData: PageData = { type: selectedPageType, content: data.content };

    if (selectedPageType === "title") {
      pageData.title = data.title;
    }

    if (selectedPageType === "content") {
      pageData.chapterTitle = data.chapterTitle;
    }

    onPageSubmit(pageData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="pageType" className="block text-sm font-semibold text-gray-700 dark:text-gray-100">
          Select Page Type:
        </label>
        <select id="pageType" className="block w-full mt-2 px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" value={selectedPageType} onChange={(e) => setSelectedPageType(e.target.value as PageType)}>
          <option value="index">Index Page</option>
          <option value="title">Title Page</option>
          <option value="content">Content Page</option>
        </select>
      </div>

      {selectedPageType === "title" && <TextBox id="title" label="Book Title" placeholder="Enter the book title" isTextArea={false} register={register("title", { required: "Title is required" })} />}

      {selectedPageType === "content" && <TextBox id="chapterTitle" label="Chapter Title" placeholder="Enter the chapter title" isTextArea={false} register={register("chapterTitle", { required: "Chapter title is required" })} />}

      <TextBox id="content" label="Content" placeholder="Enter the page content" isTextArea={true} register={register("content", { required: "Content is required" })} />

      <button type="submit" className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Add Page
      </button>
    </form>
  );
};

export default AddPageForm;
