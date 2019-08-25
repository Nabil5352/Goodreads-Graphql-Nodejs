const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
	code: String
});

module.exports = mongoose.model("Language", languageSchema);
