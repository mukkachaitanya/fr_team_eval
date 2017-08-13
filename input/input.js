const Promise = require("bluebird");
const parser = Promise.promisify(require("csv-parse"));
const readFile = Promise.promisify(require("fs").readFile);


var options = {
	trim: true,
	auto_parse: false,
	columns: header => {console.log(header)}
};

/*
* Function fileContents reads the contents of a csv file and parses it
* @returnType Object of parser class
*/
var fileContents = function(file) {
	return readFile(file, "utf8").then(function(content) {
		return parser(content, options);
	});
};

module.exports = {
	csvContents: fileContents
};
