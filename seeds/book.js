const Author = require("../models/author");
const dataset = require("../../datasets/book.json");
const authorDataset = require("../../datasets/author.json");

const findAuthorByIsbn = isbn => {
	const filterData = authorDataset.filter(item => {
		if (item[0] === isbn) return item;
		else null;
	});

	return filterData[0][1];
};

const queryAction = param => {
	const res = Author.find({ name: param }).select("_id");
	return Promise.resolve(res);
};

const findAutherId = async isbn => {
	const authors = findAuthorByIsbn(isbn);
	const authorArr = authors.split(",");
	return Promise.all(
		authorArr.map(async (author, idx) => {
			const athr = author.trim();
			const res = await queryAction(athr);
			console.log("author", athr, "res", res);
			return res.map(obj => obj._id);
		})
	).then(resArr => [].concat.apply([], resArr));
};

Promise.all(
	dataset.map(async data => ({
		isbn: data[0],
		title: data[1],
		isbn13: data[2],
		originalPublicationYear: data[3],
		imageUrl: data[4],
		authorId: await findAutherId(data[0]),
		languageId: null,
		ratingId: null
	}))
).then(res => console.log("Book mapping completed ", res));
