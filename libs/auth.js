import { createError } from 'apollo-errors';
import jwt from 'jsonwebtoken';

const AuthorizationError = createError('AuthorizationError', {
	message: 'You are not authorized!'
});

const tokenChecker = (context, controller) => {
	const { authorization = null } = context.headers;
	try {
		if (authorization) {
			const decode = jwt.verify(
				authorization.replace('Bearer ', ''),
				process.env.GGKEY_TOKEN
			);
			return controller;
		}
	} catch (err) {
		throw new AuthorizationError();
	}
};

module.exports = tokenChecker;
