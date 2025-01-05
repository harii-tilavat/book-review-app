import React from "react";
import { PaginationModel } from "../models/PaginationModel";
import { DraftModel } from "../models/DraftModel";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import LoaderSpinner from "./comman/LoaderSpinner";
import { useDraftManager } from "../hooks/useDraftManger";
import { useModal } from "../context/ModalContext";

interface DraftListProps {
  onPageChange: (newPage: number) => void;
  drafts: Array<DraftModel>;
  pagination: PaginationModel;
  isLoading: boolean;
}

const DraftList: React.FC<DraftListProps> = ({ drafts, pagination, onPageChange, isLoading }) => {
  const navigate = useNavigate();
  const { deleteDraft } = useDraftManager();
  const { showModal } = useModal();
  const handlePublishToggle = (draftId: string) => {
    // Logic to toggle publish status
    console.log(`Toggled publish for draft: ${draftId}`);
  };

  const handleDelete = (draftId: string) => {
    // showModal
    showModal({
      title: "Delete draft",
      description: "Are you sure you want to delete this draft? This action cannot be undone.",
      confirmLabel: "Yes, Delete",
      cancelLabel: "Cancel",
      confirmType: "danger",
      onConfirm: () => deleteDraft(draftId),
    });
  };

  const handleEdit = (draftId: string) => {
    // Logic to edit the draft
    navigate("/edit-draft/" + draftId);
    console.log(`Editing draft: ${draftId}`);
  };
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className={`container mx-auto px-4 py-8 bg-gray-800 text-white`}>
      {/* Landing Section */}

      {!drafts.length && !isLoading && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Drafts Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find your drafts. Please create the draft</p>
          <button
            onClick={() => navigate("/add-draft")} // Replace with your route or navigation logic
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4">
            <PlusCircleIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
            Create draft
          </button>
        </div>
      )}
      {drafts.length > 0 && (
        <div className="main-draft-section">
          <h1 className="text-3xl font-bold text-center mb-6">Your Drafts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  py-2">
            {drafts.map((draft: DraftModel) => (
              <div key={draft.id} className={`p-6 rounded-lg shadow-lg bg-gray-700`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{draft.title}</h3>
                  {/* <span className={`px-3 py-1 rounded-full text-white ${draft.isPublished ? "bg-green-500" : "bg-red-500"}`}>{draft.isPublished ? "Published" : "Draft"}</span> */}
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Pages:</strong> {draft.pages.length}
                  </p>
                  <p>
                    <strong>Created on:</strong> {formatDate(draft.createdAt!)}
                  </p>
                  <p>
                    <strong>Last updated:</strong> {formatDate(draft.updatedAt!)}
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
          {!drafts.length && <p>No drafts found.</p>}
          {/* Pagination state */}
          {/* <Pagination currentPage={pagination.page} totalPages={pagination.totalPages || 0} onPageChange={onPageChange} /> */}
        </div>
      )}
    </div>
  );
};

export default DraftList;
