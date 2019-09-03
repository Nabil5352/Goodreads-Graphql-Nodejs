const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	isbn: String,
	isbn13: String,
	originalPublicationYear: String,
	imageUrl: String,
	authorId: String,
	languageId: String,
	ratingId: String
});

module.exports = mongoose.model("Book", bookSchema);
