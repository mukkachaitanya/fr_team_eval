//const Promise = require("bluebird");
const api = require("../senecaAPI");

const mocha = require("mocha");
const expect = require("chai").expect;

const Seneca = require("seneca");
//const config = require("./test_files/config.json");

describe("Seneca", function() {
	it("writes the results", function(done) {
        var config = {    
            "role": "evaluate",
            "cmd": "team",
            "teams": __dirname + "/test_files/team.csv",
            "scores": __dirname + "/test_files/scores.csv"
        };
		const testApi = Seneca({log : 'test'}).use(api);  

		testApi.act(config, function(err, res) {
			expect(res.status).to.equal("suceess");
			done();
		});
	});
});