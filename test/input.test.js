var input = require("../input");
var Promise = require("bluebird");

var mocha = require("mocha");
var expect = require("chai").expect;

describe("Input", function() {

	it("should match", function(done) {
		input.csvContents(__dirname+"/test_files/scores.csv").then(function(contents) {
			var expectRows = [
				["2012A7PS001G", "9"],
				["2012A7PS005G", "9"],
				["2011B1A7001G", "8"],
				["2012A7PS003G", "4"],
				["student1", "5"],
				["student2", "2"],
				["student3", "3"]
			];
			var expectHeaders = ["studentID", "score"];

			expect(contents.getContent()).to.eql(expectRows);
			expect(contents.getHeaders()).to.eql(expectHeaders);
		}).then(done);
	});
});
