const graphql = require("graphql");

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GrahQLString,
	GrahQLInt,
	GrahQLList
} = graphql;

const BookData = [
	{
		id: 1,
		title: "Name of the books",
		isbn: "1234",
		isbn13: "1234567",
		original_publication_year: "1967"
	},
	{
		id: 2,
		title: "Name of the books 2",
		isbn: "5678",
		isbn13: "567890",
		original_publication_year: "1960"
	}
];

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GrahQLString }
	})
});

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GrahQLString },
		isbn: { type: GrahQLString },
		isbn13: { type: GrahQLString },
		original_publication_year: { type: GrahQLString },
		language_id: { type: GrahQLString },
		image_url: { type: GrahQLString }
	})
});

const LanguageType = new GraphQLObjectType({
	name: "Language",
	fields: () => ({
		id: { type: GraphQLID },
		code: { type: GrahQLString }
	})
});

const RatingType = new GraphQLObjectType({
	name: "Rating",
	fields: () => ({
		id: { type: GraphQLID },
		rating_1: { type: GrahQLString },
		rating_2: { type: GrahQLString },
		rating_3: { type: GrahQLString },
		rating_4: { type: GrahQLString },
		rating_5: { type: GrahQLString },
		average: { type: GrahQLString },
		book_id: { type: GrahQLString }
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
				return BookData;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
