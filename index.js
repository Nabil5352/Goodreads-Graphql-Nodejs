// Package Import
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

// Local Import
const generalSchema = require('./schema/general');
const relaySchema = require('./schema/relay');
// const seeding = require('./seeds/start')

// Server Configuration
const ENV = process.env;
const env = ENV.NODE_ENV || 'development';
const port = ENV.PORT || 4000;
const tokenKey = ENV.GGKEY_TOKEN;

const app = express();

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

if (!tokenKey) {
	console.log('Set initial environment variables');
	process.exit(1);
}

if (!process.env.DB_STRING) {
	process.exit(1);
}

mongoose
	.connect(ENV.DB_STRING, { useNewUrlParser: true })
	.then(() => {
		console.log('Database connected');
		/*
		Warning: read seed files code properly, this might damange existing db
		// seeding();
		*/
	})
	.catch(err => console.log('Database connection error.', err));

// default route
app.get('/', (req, res) => res.redirect('/api'));
app.use(
	'/api',
	graphqlHTTP({
		schema: generalSchema,
		graphiql: true
	})
);

app.use(
	'/rapi',
	graphqlHTTP({
		schema: relaySchema,
		graphiql: !!(env === 'development')
	})
);

// all route
app.get('*', (req, res) => res.redirect('/api'));
