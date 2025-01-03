import React, { useState, useEffect } from "react";

// Temporary array simulating the drafts
const drafts = Array.from({ length: 12 }, (_, index) => ({
  id: `draft-${index + 1}`,
  userId: `user-${index + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  isPublished: index % 2 === 0, // Some are published, some aren't
  user: { id: `user-${index + 1}`, name: `User ${index + 1}` },
  pageCount: Math.floor(Math.random() * 10) + 1, // Random page count between 1 and 10
  bookCount: Math.floor(Math.random() * 5) + 1, // Random book count between 1 and 5
}));

const DraftList = () => {
  // Get the stored theme or default to light
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  // Update localStorage whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handlePublishToggle = (draftId) => {
    // Logic to toggle publish status
    console.log(`Toggled publish for draft: ${draftId}`);
  };

  const handleDelete = (draftId) => {
    // Logic to delete the draft
    console.log(`Deleted draft: ${draftId}`);
  };

  const handleEdit = (draftId) => {
    // Logic to edit the draft
    console.log(`Editing draft: ${draftId}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Your Drafts</h1>
      <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  py-2">
        {drafts.map((draft) => (
          <div key={draft.id} className={`p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Draft {draft.id}</h3>
              <span className={`px-3 py-1 rounded-full text-white ${draft.isPublished ? "bg-green-500" : "bg-red-500"}`}>{draft.isPublished ? "Published" : "Draft"}</span>
            </div>
            <div className="mb-4">
              <p>
                <strong>Created by:</strong> {draft.user.name}
              </p>
              <p>
                <strong>Pages:</strong> {draft.pageCount}
              </p>
              <p>
                <strong>Books:</strong> {draft.bookCount}
              </p>
              <p>
                <strong>Created on:</strong> {draft.createdAt.toLocaleDateString()}
              </p>
              <p>
                <strong>Last updated:</strong> {draft.updatedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(draft.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
                Edit
              </button>
              <button onClick={() => handleDelete(draft.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400">
                Delete
              </button>
              <button onClick={() => handlePublishToggle(draft.id)} className={`px-4 py-2 rounded-md ${draft.isPublished ? "bg-yellow-500" : "bg-green-500"} text-white hover:bg-opacity-80`}>
                {draft.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={toggleTheme} className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
        Toggle Theme
      </button>
    </div>
  );
};

export default DraftList;
