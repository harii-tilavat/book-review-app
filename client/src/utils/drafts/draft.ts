import { DraftModel } from "../../models/DraftModel";

// Save a single draft to localStorage
const saveDraftToLocalStorage = (draft: DraftModel) => {
    localStorage.setItem(draft.id, JSON.stringify(draft));
};

// Retrieve a single draft from localStorage
const getDraftFromLocalStorage = (draftId: string): DraftModel | null => {
    const storedDraft = localStorage.getItem(`draft-${draftId}`);
    return storedDraft ? JSON.parse(storedDraft) : null;
};

// Delete a single draft from localStorage
const deleteDraftFromLocalStorage = (draftId: number | string) => {
    localStorage.removeItem(`draft-${draftId}`);
};

// Get all drafts (keys starting with `draft-`)
const getAllDraftsFromLocalStorage = (): DraftModel[] => {
    const drafts: DraftModel[] = [];
    for (const key in localStorage) {
        if (key.startsWith("draft-")) {
            const draft = localStorage.getItem(key);
            if (draft) drafts.push(JSON.parse(draft));
        }
    }
    return drafts;
};
export { saveDraftToLocalStorage, getAllDraftsFromLocalStorage, deleteDraftFromLocalStorage, getDraftFromLocalStorage }