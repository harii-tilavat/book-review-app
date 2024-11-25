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
    createdAt:string;
    updatedAt:string;
}

export interface ReviewModel {
    bookId:string;
    rating: number;
    text: string;
    user: { username: string };
    id: string;
}
export interface BookResponseModel {
    book: BookModel;
    recommendations: Array<BookModel>;
}