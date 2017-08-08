const Promise = require('bluebird');
const parser = require('./csvParse');
const readFile = Promise.promisify(require('fs').readFile);

/*
* Function fileContents reads the contents of a csv file and parses it
* @returnType Object of parser class
*/
var fileContents = function(file) {
	
	return readFile(file,'utf8').then(function(content) {
		return new parser(content);
	});
};


module.exports = {
	csvContents : fileContents
}