export const DUMMY_BOOKS = [
    {
        id: '1',
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Classic",
        cover: "https://via.placeholder.com/150?text=Cover+Image+1",
        rating: 4.5,
        reviews: [
            { id: '1', user: "Alice", comment: "Amazing read!", rating: 5 },
            { id: '2', user: "Bob", comment: "Quite good!", rating: 4 },
        ],
    },
    {
        id: '2',
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        genre: "Dystopian",
        cover: "https://via.placeholder.com/150?text=Cover+Image+1",
        rating: 4.8,
        reviews: [
            { id: '1', user: "Carol", comment: "A must-read!", rating: 5 },
        ],
    },
    {
        id: '3',
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        genre: "Fiction",
        cover: "https://via.placeholder.com/150?text=Cover+Image+1",
        rating: 4.3,
        reviews: [
            { id: '1', user: "Dave", comment: "Loved it!", rating: 4 },
            { id: '2', user: "Eve", comment: "A thought-provoking story.", rating: 5 },
        ],
    },
];
