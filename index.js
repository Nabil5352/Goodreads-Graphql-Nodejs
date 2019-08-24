// Package Import
const express = require("express");
const graphqlHTTP = require("express-graphql");

// Local Import
const schema = require("./schema");

// Server Configuration
const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

// Route
app.get("/", (req, res) => res.redirect("/api"));
app.use(
	"/api",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);
