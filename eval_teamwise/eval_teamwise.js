const Promise = require("bluebird");
const input = require("../input");
const output = require("../output");
const _ = require('lodash');

/*
* The function takes necessary arguments:
* scorescsv : The path to the csv file corresponding to the scores of students
* teamcsv : The path to the csv file corresponding to the teams of the students
* [teamScorescsv] :  An optional argument specifying the path to the csv file to output evaluated marks
*
* @author: Chaitanya Mukka
*
*/


var computeTeamResults = function(args) {
    // Check if whether to read from SQL.
    const database = args.database
    if (typeof database !== 'undefined') {
        promiseMarks = input.sqlContents(database, args.scores)
        promiseTeam = input.sqlContents(database, args.teams)
    }
    else {
        // promises which resolve to return contents parsed of the scorescsv file and teamcsv files
        promiseMarks = input.csvContents(args.scores);
        promiseTeam = input.csvContents(args.teams);
    }
    return Promise.all([promiseMarks, promiseTeam]).then(function(res) {
        // res contains the returns of all the promises in the order of as in the input array of promises
        if (typeof database !== 'undefined') {
            marks = res[0]; // [[studentID,score]]
            teams = res[1]; // [[studentID,team]]
        }
        else {
            marks = res[0].getContent(); // [[studentID,score]]
            teams = res[1].getContent(); // [[studentID,team]]
        }
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

        _.forIn(teamView, function(members, team) {
            // pick the objects corresponding to the team members from marksView, and get the scores in array;
            // find the max of the array
            var maxScore = _.max(_.values(_.pick(marksView, members)));

            // zip together the student id and the maxScore; type: [[id,score]]
            var updatedScores = _.zip(members,_.fill(Array(members.length),maxScore));

            // for each of the member push them onto finalMarks
            _.forEach(updatedScores,(tup)=>finalMarks.push(tup));
        });

        // TODO: log members those who don't have any assigned teams
        //logger.info(`No teams found for ${members}`);
        return output(finalMarks, args.teamScorescsv || "./teamScores.csv");
    }).catch(err => { console.error(err)});
};

module.exports = {
    writeResult: computeTeamResults
};
