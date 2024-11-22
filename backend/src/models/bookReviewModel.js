class BookModel {
    constructor({ id, userId, title, author, genre, cover, createdAt, updatedAt }) {
        this.id = id;
        // this.userId = userId;  // ID of the user who created the book
        this.title = title;  // Title of the book
        this.author = author;  // Author of the book
        this.genre = genre;  // Genre of the book
        this.cover = cover;  // Cover image URL or data of the book
        this.createdAt = createdAt;  // Timestamp when the book was created
        this.updatedAt = updatedAt;  // Timestamp when the book was last updated
    }
}

module.exports = { BookModel };
