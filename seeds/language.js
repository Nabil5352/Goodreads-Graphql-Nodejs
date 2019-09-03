const dataset = require("../../datasets/languageOnly.json");

module.exports = dataset
	.map(data => data[0].split(","))
	.map(item =>
		item.map(val => ({
			code: val
		}))
	)
	.map(item => item[0]);
