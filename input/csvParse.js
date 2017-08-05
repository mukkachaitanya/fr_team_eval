var parser = function(content, options) {
	this.options = options || { "delimiter": "," };

	this.content = content.trim().split("\n").map(function(val) {
		return val.split(',');
	});

	this.headers = this.content.shift();
};

parser.prototype.getContent = function() {
	return this.content;
};

parser.prototype.getHeaders = function() {
	return this.headers;
};

module.exports = parser;
