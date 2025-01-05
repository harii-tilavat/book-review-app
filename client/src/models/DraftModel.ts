export interface DraftModel {
    id: string;
    title: string;
    pages: Array<PageModel>;
    createdAt?: string;
    updatedAt?: string;
    isPublished?: boolean;
}
export interface PageType {
    INDEX: "INDEX",
    TITLE: "TITLE",
    CONTENT: "CONTENT"
}
export interface PageModel {
    id?: string;
    tempId?: string;
    content?: string;
    order: number;
    type: "INDEX" | "TITLE" | "CONTENT";
    draftId?: string;
    createdAt?: string;
    updatedAt?: string;
    isChanged?:boolean;
}