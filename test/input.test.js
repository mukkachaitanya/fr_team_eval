const input = require("../input");
const Promise = require("bluebird");

const mocha = require("mocha");
const expect = require("chai").expect;

describe("Input", function() {

	it("should match parsed input", function(done) {
		input.csvContents(__dirname+"/test_files/scores.csv").then(function(contents) {
			const expectRows = [
				["2012A7PS001G", "9"],
				["2012A7PS005G", "9"],
				["2011B1A7001G", "8"],
				["2012A7PS003G", "4"],
				["student1", "5"],
				["student2", "2"],
				["student3", "3"]
			];

			expect(contents).to.eql(expectRows);
		}).then(done);
	});
});
