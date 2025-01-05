// import BookForm from "../../components/BookForm";
import { useNavigate } from "react-router-dom";
import DraftEditor from "../../components/Drafts/DraftEditor";
import { useDraftStore } from "../../store/useDraftStore";
import { DraftModel } from "../../models/DraftModel";

const AddDraftPage = () => {
  const { createDraft } = useDraftStore();
  const navigate = useNavigate();
  async function handleSaveDraft(draft: DraftModel) {
    await createDraft({ title: draft.title!, pages: draft.pages } as DraftModel);
    navigate("/my-drafts");
  }
  return (
    <>
      <DraftEditor onSaveDraft={handleSaveDraft} />
      {/* <BookForm onSubmit={() => {}} isLoading={false} /> */}
    </>
  );
};

export default AddDraftPage;
