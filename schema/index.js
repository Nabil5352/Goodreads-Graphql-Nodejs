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
	GraphQLList
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
				// return _.filter(BookData, { authorId: parent.id });
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
				// return _.find(AuthorData, { id: parent.authorId });
			}
		},
		language: {
			type: LanguageType,
			resolve(parent, args) {
				// return _.find(LanguageData, { id: parent.languageId });
			}
		},
		rating: {
			type: RatingType,
			resolve(parent, args) {
				// return _.find(RatingData, { id: parent.ratingId });
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
				// return _.filter(BookData, { languageId: parent.id });
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
				// return _.filter(BookData, { ratingId: parent.id });
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
				//get data from db / other
				// return _.find(BookData, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return BookData;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(AuthorData, { id: args.id });
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return AuthorData;
			}
		},
		language: {
			type: LanguageType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(LanguageData, { id: args.id });
			}
		},
		languages: {
			type: new GraphQLList(LanguageType),
			resolve(parent, args) {
				// return LanguageData;
			}
		},
		rating: {
			type: RatingType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(RatingData, { id: args.id });
			}
		},
		ratings: {
			type: new GraphQLList(RatingType),
			resolve(parent, args) {
				// return RatingData;
			}
		}
	}
});

// Mutation
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name
				});
				return author.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
