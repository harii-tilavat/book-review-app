import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { DraftModel, PageModel } from "../../models/DraftModel";
import { useDraftManager } from "../../hooks/useDraftManger";
import { toast } from "react-toastify";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import DraftViewer from "../DraftViewer";
import LoaderSpinner from "../comman/LoaderSpinner";
import MarkdownEditor from "./MarkdownEditor";

interface DraftEditorProps {
  onSaveDraft: (draft: DraftModel) => void;
  editMode?: boolean;
}

const DraftEditor: React.FC<DraftEditorProps> = ({ onSaveDraft, editMode = false }) => {
  const [title, setTitle] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { currentDraft, updateContent, isLoading, addPage, deletePage, setCurrentDraft } = useDraftManager();
  const navigate = useNavigate();
  const { showModal } = useModal();
  useEffect(() => {
    if (editMode && currentDraft && currentDraft.id) {
      setTitle(currentDraft.title);
    }
  }, [editMode, currentDraft]);
  // Update currentDraft when pages or title changes
  //  How to change currentDraft state when markdown content change
  useEffect(() => {
    if (!editMode) {
      setCurrentDraft(null);
    }
  }, []);
  const updatePageContent = useCallback(
    (order: number, content: string) => {
      // Directly update the page content via the updateAllPagesContent function
      updateContent(order, content, editMode);
    },
    [updateContent]
  );

  function handleDeletePage(order: number) {
    showModal({
      title: "Delete page",
      description: "Are you sure you want to delete this page?",
      confirmLabel: "Yes, Delete",
      cancelLabel: "Cancel",
      confirmType: "danger",
      onConfirm: () => deletePage(order),
    });
  }
  const saveDraft = async () => {
    if (!title) {
      toast.error("Title required!");
      return;
    }
    onSaveDraft({ ...currentDraft!, title }!);
  };
  return (
    <div className="min-h-[38rem] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="draft-editor-container p-6 bg-white dark:bg-gray-800 rounded-md">
          <div className="draft-header flex justify-between mb-12">
            <button
              onClick={() => navigate("/my-drafts")} // Replace with your route or navigation logic
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm">
              <ArrowLeftIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
              Back to Drafts
            </button>
            <h2 className="text-3xl font-bold  text-center text-blue-400">Draft Editor</h2>
          </div>
          <div className="mb-4">
            <label htmlFor={"draft-title"} className="block text-gray-700 dark:text-gray-100 font-semibold">
              Enter draft title
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="New draft..." className="block w-full rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none" />
          </div>
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
            {currentDraft &&
              currentDraft.pages.map((page, index) => (
                <MarkdownEditor onDeletePage={handleDeletePage} onUpdatePageContent={updatePageContent} page={page} key={index} />
                // <div key={index} className="p-6 rounded-lg shadow-md dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900">
                //   <div className="page-header flex justify-between items-center mb-4">
                //     <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-800 ">
                //       {page.type} Page #{page.order}
                //     </h3>
                //     <button onClick={() => handleDeletePage(page.order)} className="text-red-400 hover:text-red-600 transition" title="Delete Page">
                //       <XMarkIcon className="h-8 w-8 " />
                //     </button>
                //   </div>
                //   <ReactMde
                //     value={page.content}
                //     onChange={(value) => updatePageContent(page.order, value)}
                //     selectedTab={selectedTab}
                //     onTabChange={setSelectedTab}
                //     generateMarkdownPreview={(markdown) => Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)}
                //     classes={{
                //       toolbar: "bg-white border-gray-600 dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-300",
                //       preview: "bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200",
                //       textArea: "bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200",
                //     }}
                //   />
                // </div>
              ))}
          </div>
          <div className="mt-8 flex justify-center gap-5">
            {currentDraft && currentDraft.pages.length > 0 && (
              <button onClick={() => setIsPreviewOpen((isOpen) => !isOpen)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md transition">
                {isPreviewOpen ? "Hide preview" : "Show Preview"}
              </button>
            )}

            <button onClick={saveDraft} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded shadow-md transition">
              {isLoading ? (editMode ? "Saving draft..." : "Creating draft...") : editMode ? "Save as Draft" : "Create Draft"}
            </button>
          </div>
        </div>
      </div>
      {currentDraft && isPreviewOpen && <div className="preview">{<DraftViewer pages={currentDraft.pages} />}</div>}
    </div>
  );
};

export default DraftEditor;
