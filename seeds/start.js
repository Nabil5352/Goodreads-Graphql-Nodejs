// const mongoose = require("mongoose");
// const Db = require("mongodb").Db;
// const Server = require("mongodb").Server;

// const db = new Db("test", new Server("localhost", 27017));
// const conn = mongoose.createConnection(process.env.DB_STRING);
// conn.on("open", function() {
// 	conn.db.listCollections().toArray(function(err, names) {
// 		console.log("COLLECTIONS:", err, names);
// 		conn.close();
// 	});
// });
//MODEL
const Book = require('../models/book');
const Author = require('../models/author');
const Language = require('../models/language');
const Rating = require('../models/rating');

//SEED
const authorData = require('./author');
const languageData = require('./language');
const ratingData = require('./rating');
const bookData = require('./book');

// const deleteAuthorDB = new Promise((resolve, reject) => {
// 	try {
// 		Author.collection.drop();
// 		return resolve(200);
// 	} catch (err) {
// 		console.log("Author table delete failed! ", err);
// 		return reject(400);
// 	}
// });
// const deleteLanguageDB = new Promise((resolve, reject) => {
// 	try {
// 		Language.collection.drop();
// 		return resolve(200);
// 	} catch (err) {
// 		console.log("Language table delete failed! ", err);
// 		return reject(400);
// 	}
// });
// const deleteRatingDB = new Promise((resolve, reject) => {
// 	try {
// 		Rating.collection.drop();
// 		return resolve(200);
// 	} catch (err) {
// 		console.log("Rating table delete failed! ", err);
// 		return reject(400);
// 	}
// });
// const deleteBookDB = new Promise((resolve, reject) => {
// 	try {
// 		Book.collection.drop();
// 		return resolve(200);
// 	} catch (err) {
// 		console.log("Book table delete failed! ", err);
// 		return reject(400);
// 	}
// });

const startSeeding = () => {
	// Promise.all([
	// 	deleteAuthorDB
	// 		.then(async () => {
	// 			console.log("Deleted author table");
	// 		})
	// 		.catch(err => console.log("Failed", err)),
	// 	deleteLanguageDB
	// 		.then(async () => {
	// 			console.log("Deleted language table");
	// 		})
	// 		.catch(err => console.log("Failed", err)),
	// 	deleteRatingDB
	// 		.then(async () => {
	// 			console.log("Deleted rating table");
	// 		})
	// 		.catch(err => console.log("Failed", err)),
	// 	deleteBookDB
	// 		.then(async () => {
	// 			console.log("Deleted book table");
	// 		})
	// 		.catch(err => console.log("Failed", err))
	// ])
	// 	.then(() => {
	// 		let seedAuthor = false,
	// 			seedLanguage = false,
	// 			seedRating = false;
	// 		console.log("Start seeding author, language and rating table");
	// 		Author.insertMany(authorData, function(err, docs) {
	// 			if (!err) {
	// 				seedAuthor = true;
	// 				console.log("Seeding author is successful!");
	// 			} else console.log("Error in author seeding", err.message);
	// 		});
	// 		Language.insertMany(languageData, function(err, docs) {
	// 			if (!err) {
	// 				seedLanguage = true;
	// 				console.log("Seeding language is successful!");
	// 			} else console.log("Error in language seeding", err.message);
	// 		});
	// 		Rating.insertMany(ratingData, function(err, docs) {
	// 			if (!err) {
	// 				seedRating = true;
	// 				console.log("Seeding rating data is successful!");
	// 			} else console.log("Error in rating seeding", err.message);
	// 		});
	// 		if (seedAuthor && seedLanguage && seedRating) {
	// 			console.log("Start seeding book table");
	// 			bookData()
	// 				.then(res => {
	// 					Book.insertMany(res, function(err, docs) {
	// 						if (err)
	// 							console.log(
	// 								"Error in book seeding",
	// 								err.message
	// 							);
	// 						else
	// 							console.log("Seeding book data is successful!");
	// 					});
	// 				})
	// 				.catch(err => console.log("Error in bookdata", err));
	// 		}
	// 	})
	// 	.catch(err => console.log("Something went wrong!", err));
	console.log('Start seeding ');
	Author.insertMany(authorData, function(err) {
		if (!err) {
			// seedAuthor = true;
			console.log('Seeding author is successful!');
		} else console.log('Error in author seeding', err.message);
	});
	Language.insertMany(languageData, function(err) {
		if (!err) {
			// seedLanguage = true;
			console.log('Seeding language is successful!');
		} else console.log('Error in language seeding', err.message);
	});
	Rating.insertMany(ratingData, function(err) {
		if (!err) {
			// seedRating = true;
			console.log('Seeding rating data is successful!');
		} else console.log('Error in rating seeding', err.message);
	});

	bookData()
		.then(res => {
			Book.insertMany(res, function(err) {
				if (err) console.log('Error in book seeding', err.message);
				else console.log('Seeding book data is successful!');
			});
		})
		.catch(err => console.log('Error in bookdata', err));
};

module.exports = startSeeding;
