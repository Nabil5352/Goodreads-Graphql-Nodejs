const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
	rating1: Number,
	rating2: Number,
	rating3: Number,
	rating4: Number,
	rating5: Number
});

module.exports = mongoose.model("Rating", ratingSchema);
