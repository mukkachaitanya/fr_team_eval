const Promise = require("bluebird");
const input = require("../input");
const output = require("../output");
const _ = require("lodash");

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
        const marks = res[0]; // [[studentID,score]]
        const teams = res[1]; // [[studentID,team]]

        /* teamView Object of the form: 
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


        /* marksView Object of the form: 
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
            // find the max of the array if scores are submitted else 0
            var maxScore = _.max(_.values(_.pick(marksView, members))) || 0;

            // zip together the student id and the maxScore; type: [[id,score]]
            var updatedScores = _.zip(
                members,
                _.fill(Array(members.length), maxScore)
            );

            // for each of the member push them onto finalMarks
            _.forEach(updatedScores, tup => finalMarks.push(tup));
        });

        // log members those who don't have any assigned teams
        var illegalInputs = _.omit(marksView, _.flatten(_.values(teamView)));
        logger.info("Illegal inputs\n", illegalInputs);

        return output(finalMarks, args.teamScorescsv || "./teamScores.csv");
    }).catch(err=>{console.error(err)});
};

module.exports = {
    writeResult: computeTeamResults
};

