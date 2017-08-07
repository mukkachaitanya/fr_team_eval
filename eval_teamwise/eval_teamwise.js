const Promise = require("bluebird");
const input = require("../input");
const output = require("../output");

var computeTeamResults = function(args) {
    const promiseMarks = input.csvContents(args.scorescsv);
    const promiseTeam = input.csvContents(args.teamcsv);


    return Promise.all([promiseMarks, promiseTeam]).then(function(res) {
        const marks = res[0].getContent();
        const teams = res[1].getContent();

        var teamView = {};

        teams.map(function(tuple) {
            if (!teamView.hasOwnProperty(tuple[1])) teamView[tuple[1]] = [];
            teamView[tuple[1]].push(tuple[0]);
        });

        var marksView = {};

        marks.map(function(tup) {
            marksView[tup[0]] = parseInt(tup[1]);
        });

        var finalMarks = [["id", "score"]];

        for (team in teamView) {
            var members = teamView[team];
            var memberScores = [];

            for (member of members) memberScores.push(marksView[member] || 0);

            var maxScore = memberScores.reduce(function(a, b) {
                return a < b ? b : a;
            });

            for (member of members) finalMarks.push([member, maxScore]);
        }
        return output(finalMarks, args.teamScorescsv || "./teamScores.csv");
    });
};

module.exports = {
    writeResult: computeTeamResults
};
