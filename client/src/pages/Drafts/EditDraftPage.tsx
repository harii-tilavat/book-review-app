import { useParams } from "react-router-dom";
import DraftEditor from "../../components/DraftEditor";
import { useDraftManager } from "../../hooks/useDraftManger";
import { DraftModel } from "../../models/DraftModel";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { toast } from "react-toastify";

const EditDraftPage = () => {
  const params = useParams();
  const { getDraftById, currentDraft, updateDraft } = useDraftManager();
  function handleSaveDraft(draft: DraftModel) {
    if (!draft.id) {
      toast.error("Invalid draft!");
      return;
    }
    updateDraft(draft);
  }

  useEffect(() => {
    if (params["id"]) {
      getDraftById(params["id"]);
    }
  }, [params["id"]]);
  if (!currentDraft) return null;
  return (
    <>
      <DraftEditor onSaveDraft={handleSaveDraft} editMode={true} />
    </>
  );
};

export default EditDraftPage;
