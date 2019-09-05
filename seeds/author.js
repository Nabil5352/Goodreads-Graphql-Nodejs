const dataset = require("../../datasets/authorOnly.json");

//format
const datasetMap = dataset
	.map(data => data[0].split(","))
	.map(item =>
		item.map(val => ({
			name: val.trim()
		}))
	);

//remove duplicates
const mapResult = [].concat.apply([], datasetMap).reduce((acc, current) => {
	const exist = acc.find(item => item.name.trim() === current.name.trim());
	if (!exist) {
		return acc.concat([current]);
	} else {
		return acc;
	}
}, []);

module.exports = mapResult;
