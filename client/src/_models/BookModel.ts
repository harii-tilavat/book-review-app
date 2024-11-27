import GenreModel from "./GenreModel";

export interface BookModel {
    id: string;
    userId: string;
    title: string;
    cover: string;
    author: string;
    isbn: string;
    description?: string;
    genre: GenreModel;
    genreId: string
    avgRating: number;
    reviews: Array<ReviewModel>;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewModel {
    bookId: string;
    book?: BookModel;
    createdAt?: string;
    rating: number;
    text: string;
    user?: { username: string };
    id: string;
}

export interface BookResponseModel {
    book: BookModel;
    recommendations: Array<BookModel>;
}
export const sortByOptions = [
    { id: 1, label: "Title", value: "title" },
    { id: 2, label: "Author", value: "author" },
    { id: 3, label: "Average Rating", value: "avgRating" },
    { id: 4, label: "Date Added", value: "createdAt" },
];
export class FilterModel {
    genreId: string;
    sortField: string;
    sortOrder: "asc" | "desc" | "";
    constructor() {
        this.genreId = "";
        this.sortField = "";
        this.sortOrder = "";
    }
}