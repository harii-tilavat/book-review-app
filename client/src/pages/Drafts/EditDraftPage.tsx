import { useNavigate, useParams } from "react-router-dom";
import DraftEditor from "../../components/Drafts/DraftEditor";
import { useDraftManager } from "../../hooks/useDraftManger";
import { DraftModel } from "../../models/DraftModel";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import LoaderSpinner from "../../components/comman/LoaderSpinner";
import BookForm from "../../components/BookForm";

const EditDraftPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getDraftById, currentDraft, updateDraft, isDraftLoading, isDraftPublishing, publishDraft } = useDraftManager();
  function handleSaveDraft(draft: DraftModel) {
    if (!draft.id) {
      toast.error("Invalid draft!");
      return;
    }
    updateDraft(draft);
  }
  async function handlePublishDraft(book: FormData) {
    if (!currentDraft?.title) {
      toast.error("Draft title required!");
      return;
    }
    if (!currentDraft.id) {
      toast.error("Invalid draft!");
      return;
    }
    await publishDraft(currentDraft, book);
    navigate("/");
  }
  useEffect(() => {
    if (params["id"]) {
      getDraftById(params["id"]);
    }
  }, [params["id"]]);
  if (isDraftLoading) {
    return <LoaderSpinner />;
  }
  return (
    <>
      {!currentDraft && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-5">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Draft Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Sorry, we couldn't find your draft. Please create the draft</p>
          <button
            onClick={() => navigate("/add-draft")} // Replace with your route or navigation logic
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold text-sm mt-4">
            <PlusCircleIcon className="h-5 w-5 mr-2" /> {/* Icon with margin */}
            Create draft
          </button>
        </div>
      )}

      <DraftEditor onSaveDraft={handleSaveDraft} editMode={true} />
      <BookForm btnLabel="Publish book" btnLoadingLabel="Publishing..." headerText="Publish this draft" isLoading={isDraftPublishing} showBookBtn={false} onSubmit={handlePublishDraft} />
    </>
  );
};

export default EditDraftPage;
