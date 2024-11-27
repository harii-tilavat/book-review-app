class ReviewModel {
    constructor(id, user, text, rating) {
        this.id = id;
        this.username = user.name;
        this.text = text;
        this.rating = rating;
    }
}
module.exports = ReviewModel;