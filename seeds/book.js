// models
const Author = require("../models/author");
const Language = require("../models/language");
const Rating = require("../models/rating");

// datasets
const dataset = require("../../datasets/book.json");
const authorDataset = require("../../datasets/author.json");
const languageDataset = require("../../datasets/language.json");

//local search
const findAuthorByIsbn = isbn => {
	const filterData = authorDataset.filter(item => {
		if (item[0] === isbn) return item;
		else null;
	});

	return filterData[0][1];
};

const findLanguageByIsbn = isbn => {
	const filterData = languageDataset.filter(item => item[0] === isbn);
	if (filterData.length) return filterData[0][1];
	else return null;
};

//cloud query
const authorQueryAction = param => {
	const res = Author.find({ name: param }).select("_id");
	return Promise.resolve(res);
};

const languageQueryAction = param => {
	const res = Language.find({ code: param }).select("_id");
	return Promise.resolve(res);
};

const ratingQueryAction = param => {
	const res = Rating.find({ isbn: param }).select("_id");
	return Promise.resolve(res);
};

//private
const findAutherId = async isbn => {
	const authors = findAuthorByIsbn(isbn);
	const authorArr = authors.split(",");
	return Promise.all(
		authorArr.map(async (author, idx) => {
			const athr = author.trim();
			const res = await authorQueryAction(athr);
			return res.map(obj => obj._id);
		})
	).then(resArr => [].concat.apply([], resArr));
};

const findLanguageId = async isbn => {
	const language = findLanguageByIsbn(isbn);
	if (language) {
		const res = await languageQueryAction(language);
		return res.map(obj => obj._id);
	} else return null;
};
const findRatingId = async isbn => {
	const res = await ratingQueryAction(isbn);
	return res.map(obj => obj._id);
};

// public

const data = () =>
	Promise.all(
		dataset.map(async data => ({
			isbn: data[0],
			title: data[1],
			isbn13: data[2],
			originalPublicationYear: data[3],
			imageUrl: data[4],
			authorId: await findAutherId(data[0]),
			languageId: await findLanguageId(data[0]),
			ratingId: await findRatingId(data[0])
		}))
	)
		.then(res => res)
		.catch(err => console.log("mapping error", err));

module.exports = data;
