const Promise = require("bluebird");
const input = require("../input");
const output = require("../output");

/*
* The functions takes necessary agruments:
* scorescsv : The path to the csv file coresponding to the scores of students
* teamcsv : The path to the csv file corresponding to the teams of the students
* [teamScorescsv] :  An oprional agrument specifying the path to the csv file to output evaluated marks
*
* @author: Chaitanya Mukka
*   
*/


var computeTeamResults = function(args, logger = console) {

    // promises which resolve to return contents parsed of the scorescsv file and teamcsv files
    const promiseMarks = input.csvContents(args.scorescsv);
    const promiseTeam = input.csvContents(args.teamcsv);


    return Promise.all([promiseMarks, promiseTeam]).then(function(res) {

        // res contains the returns of all the promises in the order of as in the input array of promises
        const marks = res[0].getContent(); // [[studentID,score]]
        const teams = res[1].getContent(); // [[studentID,team]]


        /*Object of the form: 
        * {
        *   teamNumber : [Students of the team],
        * }
        */

        var teamView = {};

        // creates the object of the above form from teams array
        teams.map(function(tuple) {
            if (!teamView.hasOwnProperty(tuple[1])) teamView[tuple[1]] = [];
            teamView[tuple[1]].push(tuple[0]);
        });


        /*Object of the form: 
        * {
        *   studentID : int(score),
        * }
        */

        var marksView = {};

        // creates the object of the above from from teams array
        marks.map(function(tup) {
            marksView[tup[0]] = parseInt(tup[1]);
        });

        // finalMarks is of the form [[studentID, score]]
        var finalMarks = [["studentID", "score"]];

        for (team in teamView) {
            var members = teamView[team];
            var memberScores = [];

            // get the scores of the members of the team
            for (member of members) memberScores.push(marksView[member] || 0);

            // get max score
            var maxScore = memberScores.reduce(function(a, b) {
                return a < b ? b : a;
            });

            // push final marks of the teammates
            for (member of members) finalMarks.push([member, maxScore]);
        }

        // TODO: log members those who don't have any assigned teams
        //logger.info(`No teams found for ${members}`);
        return output(finalMarks, args.teamScorescsv || "./teamScores.csv");
    });
};

module.exports = {
    writeResult: computeTeamResults
};
