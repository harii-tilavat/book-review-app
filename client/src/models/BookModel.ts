export interface BookModel {
    id: string;
    userId: string;
    title: string;
    cover: string;
    author: string;
    isbn: string;
    genre: string;
    rating: number;
    reviews: Array<ReviewModel>
}

export interface ReviewModel {
    rating: number;
    text: string;
    user: string;
    id: string;
}
