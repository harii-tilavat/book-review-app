import { create } from "zustand";
import { DraftModel, PageModel } from "../models/DraftModel";
import axiosInstance from "../api/axiosInstance";
import { PaginationModel } from "../models/PaginationModel";
import { mapToPaginatedResponse } from "../utils/pagination";
import { handleApiError } from "../utils/api";
import { GenericReponseModel } from "../models";
import { toast } from "react-toastify";
import useBookStore from "./useBookStore";

interface DraftManagerState {
    drafts: DraftModel[];
    currentDraft: DraftModel | null;
    isLoading: boolean;
    isDraftLoading: boolean;
    isDraftPublishing: boolean;
    getAllDrafts: (params: PaginationModel) => Promise<void>;
    getDraftById: (id: string) => Promise<void>;
    createDraft: (draft: DraftModel) => Promise<void>;
    updateDraft: (updatedDraft: DraftModel) => void;
    deleteDraft: (draftId: string) => Promise<void>;
    publishDraft: (updatedDraft: DraftModel, book: FormData) => Promise<void>;
    setCurrentDraft: (draft: DraftModel | null) => void;
    updateContent: (order: number, content: string, editMode: boolean) => void;
    addPage: (type: PageModel["type"]) => void;
    deletePage: (order: number) => void;
}

export const useDraftStore = create<DraftManagerState>((set, get) => ({
    drafts: [],
    currentDraft: null,
    isLoading: false,
    isDraftLoading: false,
    isDraftPublishing: false,
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
        set({ isDraftLoading: true });
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
            set({ isDraftLoading: false });
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
    publishDraft: async (updatedDraft: DraftModel, formData: FormData) => {
        set({ isDraftPublishing: true });
        try {
            const draftToUpdate: DraftModel = { ...updatedDraft, isPublished: true };
            await axiosInstance.put<GenericReponseModel<DraftModel>>("/draft", draftToUpdate);

            // Append draftId to formData
            formData.append("draftId", updatedDraft.id);

            // Create the book
            await useBookStore.getState().createBook(formData);

            toast.success("Draft published successfully!");

            // Clean up localStorage
            localStorage.removeItem(updatedDraft.id);

        } catch (error) {
            handleApiError(error, true);
        } finally {
            set({ isDraftPublishing: false });
        }
    },

    setCurrentDraft: (draft: DraftModel | null) => {
        set({ currentDraft: draft });
    },
    // New method to update content of a specific page in current draft
    updateContent: (order: number, content: string, editMode = false) => {
        const { currentDraft } = get();
        if (currentDraft) {
            const updatedPages: Array<PageModel> = [...currentDraft.pages];
            const currentPageIndex = updatedPages.findIndex(page => page.order === order);
            if (currentPageIndex === -1) {
                console.error("Order not found!");
                return;
            }

            updatedPages[currentPageIndex] = { ...updatedPages[currentPageIndex], content, isChanged: true };
            // Update the draft with the new or updated pages
            const updatedDraft: DraftModel = { ...currentDraft, pages: updatedPages };

            if (editMode) {
                // Save the updated draft to localStorage
                localStorage.setItem(updatedDraft.id, JSON.stringify(updatedDraft));
            }

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
            createdAt: new Date().toDateString(),
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
