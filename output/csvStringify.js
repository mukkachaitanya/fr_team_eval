/*
* Funtion takes a param of the form [[...]] and converts it into a csv compatible string
*/
var stringify = function (content) {
	this.content = content.map(function(val) {
		return val.join(',');
	}).join('\n');

	return this.content;
}


module.exports = stringify;