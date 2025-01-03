import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

interface Page {
  id: number;
  type: "INDEX" | "TITLE" | "CONTENT";
  markdown: string;
  order: number;
}

const DraftEditor: React.FC = () => {
  
  const [pages, setPages] = useState<Page[]>(JSON.parse(localStorage.getItem("pages") || "") || []);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const addPage = (type: Page["type"]) => {
    setPages((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 1000000),
        type,
        markdown: "",
        order: prev.length + 1,
      },
    ]);
  };

  const updatePageContent = (id: number, markdown: string) => {
    setPages((prev) => prev.map((page) => (page.id === id ? { ...page, markdown } : page)));
  };

  const deletePage = (id: number) => {
    setPages((prev) => prev.filter((page) => page.id !== id));
  };

  const saveDraft = async () => {
    try {
      console.log("PAGES : ", pages);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };
  useEffect(() => {
    console.log("PAGE CHANGE ", pages);
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Draft Editor</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => addPage("INDEX")} className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded shadow-md transition">
            Add Index Page
          </button>
          <button onClick={() => addPage("TITLE")} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-md transition">
            Add Title Page
          </button>
          <button onClick={() => addPage("CONTENT")} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded shadow-md transition">
            Add Content Page
          </button>
        </div>

        <div className="space-y-6">
          {pages.map((page) => (
            <div key={page.id} className="p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-900 relative">
              <h3 className="text-lg font-semibold mb-4 dark:text-gray-100 text-gray-800">
                {page.type} Page #{page.order}
              </h3>
              <button onClick={() => deletePage(page.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition" title="Delete Page">
                ✖
              </button>
              <ReactMde
                value={page.markdown}
                onChange={(value) => updatePageContent(page.id, value)}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) => Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)}
                classes={{
                  toolbar: "bg-gray-700 border-gray-600 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-300",
                  preview: "bg-gray-900 text-gray-200 dark:bg-gray-900 dark:text-gray-200",
                  textArea: "bg-gray-900 text-gray-200 dark:bg-gray-900 dark:text-gray-200",
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={saveDraft} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded shadow-md transition">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
