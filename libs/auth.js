const createError = require('apollo-errors').createError;
const jwt = require('jsonwebtoken');

const AuthorizationError = createError('AuthorizationError', {
	message: 'You are not authorized!'
});

const authChecker = (context, controller) => {
	const { authorization = null } = context.headers;
	try {
		if (authorization) {
			const decode = jwt.verify(
				authorization.replace('Bearer ', ''),
				process.env.GGKEY_TOKEN
			);
			if (decode) {
				return controller;
			}
		}
		throw new AuthorizationError();
	} catch (err) {
		throw new AuthorizationError();
	}
};

module.exports = authChecker;
