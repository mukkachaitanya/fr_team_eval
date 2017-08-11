/*
* This object parses the csv input and had prototype methods getContent and getHeaders
*/

var Parser = function(content, options) {
	this.options = options || { "delimiter": "," };

	// Convert the string into a [[a,b]] format
	this.content = content.trim().split("\n").map(function(val) {
		return val.split(',');
	});

	// Headers are the first row of the csv file.
	this.headers = this.content.shift();
};

Parser.prototype.getContent = function() {
	return this.content;
};

Parser.prototype.getHeaders = function() {
	return this.headers;
};

module.exports = Parser;
