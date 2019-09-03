const dataset = require("../../datasets/authorOnly.json");

const mapResult = dataset
	.map(data => data[0].split(","))
	.map(item =>
		item.map(val => ({
			name: val
		}))
	)
	.map(item => item[0])
	.reduce((acc, current) => {
		const exist = acc.find(
			item => item.name.trim() === current.name.trim()
		);
		if (!exist) {
			return acc.concat([current]);
		} else {
			return acc;
		}
	}, []);

module.exports = mapResult;
