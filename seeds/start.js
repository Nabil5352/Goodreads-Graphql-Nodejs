//MODEL
const Book = require("../models/book");
const Author = require("../models/author");
const Language = require("../models/language");
const Rating = require("../models/rating");

//SEED
const seedAuthorData = require("./author");
const seedLanguageData = require("./language");
const seedBookData = require("./book");

console.log("Seeding started");

// Author.insertMany(seedAuthorData, function(err, docs) {
// 	if (err) console.log("Error in author seeding", err.message);
// 	else console.log("Seeding author is successful!");
// });

// Language.insertMany(seedLanguageData, function(err, docs) {
// 	if (err) console.log("Error in language seeding", err.message);
// 	else console.log("Seeding language is successful!");
// });

console.log("Seeding ended");
