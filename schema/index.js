const graphql = require("graphql");
const _ = require("lodash");

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = graphql;

//DATA
const BookData = [
	{
		id: "1",
		title: "Name of the books",
		isbn: "1234",
		isbn13: "1234567",
		originalPublicationYear: "1967",
		authorId: "2",
		languageId: "1",
		ratingId: "2"
	},
	{
		id: "2",
		title: "Name of the books 2",
		isbn: "5678",
		isbn13: "567890",
		originalPublicationYear: "1960",
		authorId: "1",
		languageId: "2",
		ratingId: "1"
	}
];

const AuthorData = [
	{
		id: "1",
		name: "Nabil Ahmad"
	},
	{
		id: "2",
		name: "Reaz Uddin"
	}
];

const LanguageData = [{ id: "1", code: "EN-US" }, { id: "2", code: "EN-UK" }];

const RatingData = [
	{
		id: "1",
		rating1: 2903,
		rating2: 234,
		rating3: 576,
		rating4: 2,
		rating5: 0
	},
	{
		id: "2",
		rating1: 0,
		rating2: 3,
		rating3: 44,
		rating4: 265,
		rating5: 5767
	}
];

// TYPE
const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(BookData, { authorId: parent.id });
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
				return _.find(AuthorData, { id: parent.authorId });
			}
		},
		language: {
			type: LanguageType,
			resolve(parent, args) {
				return _.find(LanguageData, { id: parent.languageId });
			}
		},
		rating: {
			type: RatingType,
			resolve(parent, args) {
				return _.find(RatingData, { id: parent.ratingId });
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
				return _.filter(BookData, { languageId: parent.id });
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
				return _.filter(BookData, { ratingId: parent.id });
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
				return _.find(BookData, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return BookData;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(AuthorData, { id: args.id });
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return AuthorData;
			}
		},
		language: {
			type: LanguageType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(LanguageData, { id: args.id });
			}
		},
		languages: {
			type: new GraphQLList(LanguageType),
			resolve(parent, args) {
				return LanguageData;
			}
		},
		rating: {
			type: RatingType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(RatingData, { id: args.id });
			}
		},
		ratings: {
			type: new GraphQLList(RatingType),
			resolve(parent, args) {
				return RatingData;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
