const graphql = require("graphql");

// Models
const Book = require("../models/book");
const Author = require("../models/author");
const Language = require("../models/language");
const Rating = require("../models/rating");

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

// Query
const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ authorId: parent.id });
			}
		}
	})
});

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		isbn: { type: GraphQLString },
		isbn13: { type: GraphQLString },
		originalPublicationYear: { type: GraphQLString },
		languageId: { type: GraphQLString },
		imageUrl: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findById(parent.authorId);
			}
		},
		language: {
			type: LanguageType,
			resolve(parent, args) {
				return Language.findById(parent.languageId);
			}
		},
		rating: {
			type: RatingType,
			resolve(parent, args) {
				return Rating.findById(parent.ratingId);
			}
		}
	})
});

const LanguageType = new GraphQLObjectType({
	name: "Language",
	fields: () => ({
		id: { type: GraphQLID },
		code: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ languageId: parent.id });
			}
		}
	})
});

const RatingType = new GraphQLObjectType({
	name: "Rating",
	fields: () => ({
		id: { type: GraphQLID },
		rating1: { type: GraphQLInt },
		rating2: { type: GraphQLInt },
		rating3: { type: GraphQLInt },
		rating4: { type: GraphQLInt },
		rating5: { type: GraphQLInt },
		book: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ ratingId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Book.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({});
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id);
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find({});
			}
		},
		language: {
			type: LanguageType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Language.findById(args.id);
			}
		},
		languages: {
			type: new GraphQLList(LanguageType),
			resolve(parent, args) {
				return Language.find({});
			}
		},
		rating: {
			type: RatingType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Rating.findById(args.id);
			}
		},
		ratings: {
			type: new GraphQLList(RatingType),
			resolve(parent, args) {
				return Rating.find({});
			}
		}
	}
});

// Mutation
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addBook: {
			type: BookType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				isbn: { type: GraphQLString },
				isbn13: { type: GraphQLString },
				originalPublicationYear: { type: GraphQLString },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
				languageId: { type: GraphQLID },
				ratingId: { type: GraphQLID }
			},
			resolve(
				parent,
				{
					title,
					isbn,
					isbn13,
					originalPublicationYear,
					authorId,
					languageId,
					ratingId
				}
			) {
				const book = new Book({
					title,
					isbn,
					isbn13,
					originalPublicationYear,
					authorId,
					languageId,
					ratingId
				});
				return book.save();
			}
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, { name }) {
				const author = new Author({
					name
				});
				return author.save();
			}
		},
		addLanguage: {
			type: LanguageType,
			args: {
				code: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, { code }) {
				const language = new Language({
					code
				});
				return language.save();
			}
		},
		addRating: {
			type: RatingType,
			args: {
				rating1: { type: GraphQLInt },
				rating2: { type: GraphQLInt },
				rating3: { type: GraphQLInt },
				rating4: { type: GraphQLInt },
				rating5: { type: GraphQLInt }
			},
			resolve(parent, { rating1, rating2, rating3, rating4, rating5 }) {
				const rating = new Rating({
					rating1,
					rating2,
					rating3,
					rating4,
					rating5
				});
				return rating.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
