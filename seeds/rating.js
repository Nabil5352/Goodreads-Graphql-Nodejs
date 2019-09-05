const dataset = require("../../datasets/rating.json");

const mapResult = dataset.map(item => ({
	isbn: item[0],
	rating1: item[1],
	rating2: item[2],
	rating3: item[3],
	rating4: item[4],
	rating5: item[5]
}));

module.exports = mapResult;
