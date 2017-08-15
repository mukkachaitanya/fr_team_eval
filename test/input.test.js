const input = require("../input");
const Promise = require("bluebird");

const mocha = require("mocha");
const expect = require("chai").expect;

describe("Input", function() {
	var testConfig = {
			db: "eval",
			user: "root"
		}

	it("CSV: should match parsed input", function(done) {
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

	it("SQL: should return proper parsed data", function(done) {
		
		var table = "teams";
		input.sqlContents(testConfig, table).then(function(res) {
			const expectedResults = [
				["2012A7PS001G", "1"],
				["2012A7PS005G", "1"],
				["2011B1A7001G", "4"],
				["2012A7PS003G", "4"],
				["student1", "3"],
				["student2", "4"],
				["student3", "3"]
			];

			expect(res).to.eql(expectedResults);
		}).then(done);
	});
});
