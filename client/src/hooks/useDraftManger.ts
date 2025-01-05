import { create } from "zustand";
import { DraftModel, PageModel } from "../models/DraftModel";
import { deleteDraftFromLocalStorage, saveDraftToLocalStorage } from "../utils/drafts/draft";
import axiosInstance from "../api/axiosInstance";
import { PaginationModel } from "../models/PaginationModel";
import { mapToPaginatedResponse } from "../utils/pagination";
import { handleApiError } from "../utils/api";
import { GenericReponseModel } from "../models";
import { toast } from "react-toastify";

interface DraftManagerState {
    drafts: DraftModel[];
    currentDraft: DraftModel | null;
    isLoading: boolean;
    getAllDrafts: (params: PaginationModel) => Promise<void>;
    getDraftById: (id: string) => Promise<void>;
    createDraft: (draft: DraftModel) => Promise<void>;
    updateDraft: (updatedDraft: DraftModel) => void;
    deleteDraft: (draftId: string) => Promise<void>;
    saveDraftLocally: (draft: DraftModel) => void;
    saveDraftToServer: (draft: DraftModel) => Promise<void>;
    setCurrentDraft: (draft: DraftModel | null) => void;
    updateContent: (order: number, content: string) => void;
    addPage: (type: PageModel["type"]) => void;
    deletePage: (order: number) => void;
}

export const useDraftManager = create<DraftManagerState>((set, get) => ({
    drafts: [],
    currentDraft: null,
    isLoading: false,

    getAllDrafts: async (params: PaginationModel) => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.get("/drafts", { params });
            const newDrafts = mapToPaginatedResponse<DraftModel>(data.data);
            set({ drafts: newDrafts.items });
        } catch (error) {
            handleApiError(error);
        } finally {
            set({ isLoading: false });
        }
    },

    getDraftById: async (id: string) => {
        set({ isLoading: true });
        try {
            const storedDraft = localStorage.getItem(id);
            if (storedDraft) {
                set({ currentDraft: JSON.parse(storedDraft) });
            } else {
                const { data } = await axiosInstance.get("/draft", { params: { id } });
                set({ currentDraft: data.data });
            }
        } catch (error) {
            handleApiError(error);
        } finally {
            set({ isLoading: false });
        }
    },

    createDraft: async (draft: DraftModel) => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.post<GenericReponseModel<DraftModel>>("/draft", draft);
            set({ currentDraft: data.data });
            toast.success(data.message || "Draft created successfully!");
        } catch (error) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    updateDraft: async (updatedDraft: DraftModel) => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.put<GenericReponseModel<DraftModel>>("/draft", updatedDraft);
            set({ currentDraft: data.data });
            toast.success(data.message || "Draft saved successfully!");
            localStorage.removeItem(updatedDraft.id);
        } catch (error) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteDraft: async (draftId: string) => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.delete<GenericReponseModel<DraftModel>>("/draft", { params: { draftId } });
            set({ currentDraft: null, drafts: get().drafts.filter(d => d.id !== draftId) });
            toast.success(data.message || "Draft deleted successfully!");
            localStorage.removeItem(draftId);
        } catch (error) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    saveDraftLocally: (draft: DraftModel) => {
        saveDraftToLocalStorage(draft);
        set({ currentDraft: draft });
    },

    saveDraftToServer: async (draft: DraftModel) => {
        try {
            const draftId = draft.id || "";
            const isNewDraft = draftId.startsWith("temp-");
            const response = await axiosInstance({
                url: isNewDraft ? "/draft" : `/draft/${draftId}`,
                method: isNewDraft ? "POST" : "PUT",
                data: draft,
            });

            const savedDraft = response.data;
            if (isNewDraft) {
                deleteDraftFromLocalStorage(draftId);
                saveDraftToLocalStorage(savedDraft);
            } else {
                saveDraftToLocalStorage(savedDraft);
            }

            set((state) => ({
                drafts: state.drafts.map((d) => (d.id === draft.id ? savedDraft : d)),
                currentDraft: savedDraft,
            }));
        } catch (error) {
            console.error("Failed to save draft:", error);
        }
    },

    setCurrentDraft: (draft: DraftModel | null) => {
        set({ currentDraft: draft });
    },
    // New method to update content of a specific page in current draft
    updateContent: (order: number, content: string) => {
        const { currentDraft } = get();
        if (currentDraft) {
            const updatedPages = [...currentDraft.pages];
            const currentPageIndex = updatedPages.findIndex(page => page.order === order);
            if (currentPageIndex === -1) {
                console.error("Order not found!");
                return;
            }

            updatedPages[currentPageIndex] = { ...updatedPages[currentPageIndex], content };
            // Update the draft with the new or updated pages
            const updatedDraft: DraftModel = { ...currentDraft, pages: updatedPages };

            // Save the updated draft to localStorage
            localStorage.setItem(updatedDraft.id, JSON.stringify(updatedDraft));

            // Update the state with the new draft
            set({ currentDraft: updatedDraft });
        }
    },
    // Method to add a new page to the current draft
    addPage: (type: PageModel["type"]) => {
        const { currentDraft } = get();

        // Initialize currentDraft if it's null (i.e., creating a new draft)
        const draftToUpdate = currentDraft ?? {
            title: "New Draft", // Default title if it's a new draft
            pages: [], // Empty pages array initially
        };

        // Create a new page
        const maxOrder = draftToUpdate.pages.reduce((max, page) => Math.max(max, page.order), 0);
        const newPage: PageModel = {
            order: maxOrder + 1,
            content: "",
            type,
        };

        // Update the draft with the new page
        const updatedDraft: DraftModel = { ...draftToUpdate, pages: [...draftToUpdate.pages, newPage] } as DraftModel;

        // Save the updated draft to localStorage (if you still want to store drafts temporarily)
        // Since ID is not available yet, we can either omit this or keep it as temporary storage
        if (updatedDraft.id) {
            localStorage.setItem(updatedDraft.id, JSON.stringify(updatedDraft));
        }

        // Update the state with the new draft
        set({ currentDraft: updatedDraft });
    },

    deletePage: async (order: number) => {
        try {
            const { currentDraft } = get();
            if (currentDraft) {
                const currentPage = currentDraft.pages.find(page => page.order === order);
                if (currentPage?.id) {
                    await axiosInstance.delete<GenericReponseModel>("/draft/pages", { params: { pageId: currentPage.id } });
                }

                const updatedPages = currentDraft.pages.filter(page => page.order !== order);

                const updatedDraft: DraftModel = { ...currentDraft, pages: updatedPages }

                // Update localStorage and state
                localStorage.setItem(currentDraft.id, JSON.stringify(updatedDraft));
                set({ currentDraft: updatedDraft });
            }
        } catch (error) {
            handleApiError(error);
        }
    }
}));
