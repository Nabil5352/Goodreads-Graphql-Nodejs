// Package Import
require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

// Local Import
const schema = require("./schema");
// const seeding = require("./seeds/start");

// Server Configuration
const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

mongoose
	.connect(process.env.DB_STRING, { useNewUrlParser: true })
	.then(() => {
		console.log("Database connected");
		// seeding();
	})
	.catch(err => console.log("Database connection error.", err));

// default route
app.get("/", (req, res) => res.redirect("/api"));
app.use(
	"/api",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

// all route
app.get("*", (req, res) => res.redirect("/api"));
