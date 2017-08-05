var output = require("../output");
var Promise = require("bluebird");
var readFile = Promise.promisify(require('fs').readFile);
var unlink = Promise.promisify(require('fs').unlink);

var mocha = require("mocha");
var expect = require("chai").expect;

describe("Output", function() {
	it("should match", function(done) {
		var input = [
			["2012A7PS001G", "9"],
			["2012A7PS005G", "9"],
			["2011B1A7001G", "8"],
			["2012A7PS003G", "4"],
			["student1", "5"],
			["student2", "2"],
			["student3", "3"]
		];
		var expectOutput =
			"2012A7PS001G,9\n2012A7PS005G,9\n2011B1A7001G,8\n2012A7PS003G,4\nstudent1,5\nstudent2,2\nstudent3,3";

		var tempFile = './tempFile.csv';
		output(input, tempFile)
			.then(function() {
				return readFile(tempFile,'utf8').then(function(res) {
					expect(res).to.equal(expectOutput);
					return unlink(tempFile);
				});
			})
			.then(done);
	});
});
