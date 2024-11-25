class BookModel {
    constructor({ id, userId, title, isbn, author, cover, avgRating, createdAt, updatedAt, reviews, genreId, genre, user, description }) {
        this.id = id;
        // this.userId = userId;  // ID of the user who created the book
        this.title = title;  // Title of the book
        this.author = author;  // Author of the book
        this.genreId = genreId;  // Genre of the book
        this.genre = genre;
        this.cover = cover;  // Cover image URL or data of the book
        this.description = description;  // Cover image URL or data of the book
        this.isbn = isbn;  // ISBN the book
        this.avgRating = avgRating;
        this.reviews = reviews;
        this.createdAt = createdAt;  // Timestamp when the book was created
        this.updatedAt = updatedAt;  // Timestamp when the book was last updated
        this.username = user && user.username || undefined;
    }
}

module.exports = { BookModel };
