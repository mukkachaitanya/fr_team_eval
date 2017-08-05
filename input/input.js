var Promise = require('bluebird');
var parser = require('./csvParse');
var readFile = Promise.promisify(require('fs').readFile);

var fileContents = function(file) {
	
	return readFile(file,'utf8').then(function(content) {
		return new parser(content);
	});
};


module.exports = {
	csvContents : fileContents
}