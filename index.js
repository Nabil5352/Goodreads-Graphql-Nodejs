// Package Import
import denv from 'dotenv';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

// Local Import
import generalSchema from './schema/general';
import relaySchema from './schema/relay';
// import seeding from "./seeds/start";

// Server Configuration
denv.config();
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
		graphiql: !!(env === 'development')
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
