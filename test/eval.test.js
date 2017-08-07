const Promise = require("bluebird");
const eval_teamwise = require("../eval_teamwise");
const readFile = Promise.promisify(require("fs").readFile);
const unlink = Promise.promisify(require('fs').unlink);

const mocha = require("mocha");
const expect = require("chai").expect;

describe("Evaluation", function() {
	it("should assign expected marks", function(done) {
		var expectedMarks =
			"studentID,score\n2012A7PS001G,9\n2012A7PS005G,9\nstudent1,5\nstudent3,5\n2011B1A7001G,8\n2012A7PS003G,8\nstudent2,8";

		var tempFile = "./tempFile.csv";

		var args = {
			scorescsv: __dirname + "/test_files/scores.csv",
			teamcsv: __dirname + "/test_files/team.csv",
			teamScorescsv: tempFile
		};

		eval_teamwise.writeResult(args)
			.then(function() {
				return readFile(tempFile, "utf8").then(function(cont) {
					expect(cont).to.equal(expectedMarks);
					return unlink(tempFile)
				});
			})
			.then(done);
	});
});
