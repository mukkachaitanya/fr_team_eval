const output = require("../output");
const Promise = require("bluebird");
const readFile = Promise.promisify(require('fs').readFile);
const unlink = Promise.promisify(require('fs').unlink);

const mocha = require("mocha");
const expect = require("chai").expect;

describe("Output", function() {
	it("should have expected output", function(done) {
		const input = [
			["2012A7PS001G", "9"],
			["2012A7PS005G", "9"],
			["2011B1A7001G", "8"],
			["2012A7PS003G", "4"],
			["student1", "5"],
			["student2", "2"],
			["student3", "3"]
		];
		const expectOutput =
			"2012A7PS001G,9\n2012A7PS005G,9\n2011B1A7001G,8\n2012A7PS003G,4\nstudent1,5\nstudent2,2\nstudent3,3\n";

		var tempFile = __dirname + '/tempFile.csv';
		output.write(input, tempFile)
			.then(function() {
				return readFile(tempFile,'utf8').then(function(res) {
					expect(res).to.equal(expectOutput);
					return unlink(tempFile);
				});
			})
			.then(done);
	});
});
