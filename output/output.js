const Promise = require("bluebird");
const stringify = Promise.promisify(require("csv-stringify"));
const writeFile = Promise.promisify(require("fs").writeFile);

// Writes the contents to the csvFile param
var writeCSVFile = function(content, csvFile) {
	return stringify(content).then(function(res) {
		writeFile(csvFile, res)
	});
};

module.exports = writeCSVFile;
