#!/usr/bin/env node
const prog = require('caporal');
var Promise = require("bluebird");
var input = require('./input');
var output = require('./output');

prog
    .version('1.0.0')
    .description('Program to facilitate pairwise evaluation in CS F213 Labs')
    .command('pair_eval', 'Compute pairwise evaluation scores.')
    .argument('<teamcsv>', 'CSV Data for Teams')
    .argument('<scorescsv>', 'CSV Data for Scores')
    .action(function(args, options, logger) {
        if(Object.keys(args).length != 2){
	        logger.error("Usage: node index.js pair_eval <path_to_team.csv_file> <path_to_scores.csv_file>\n\nOutputs a teamScores.csv file to the current directory");
        }

        const promiseMarks = input.csvContents(args.teamcsv);
        const promiseTeam = input.csvContents(args.scorescsv);

        var marks, team;

        Promise.all([promiseMarks, promiseTeam]).then(function(res) {
	        marks = res[0].getContent();
	        teams = res[1].getContent();

	        var teamView = {};

	        teams.map(function(tuple) {

		        if(!teamView.hasOwnProperty(tuple[1])) teamView[tuple[1]]=[];

		        teamView[tuple[1]].push(tuple[0]);
	        });


	        var marksView={};

	        marks.map(function(tup) {
		        marksView[tup[0]] = parseInt(tup[1]);
	        });

	        var finalMarks = [['id','score']];


	        for(team in teamView){
		        var members = teamView[team];
		        var memberScores = [];

		        for(member of members)
			        memberScores.push(marksView[member] || 0);

		        var maxScore = memberScores.reduce(function(a,b) {
			        return a<b? b:a;
		        });

		        for(member of members)
			        finalMarks.push([member,maxScore]);
	        }
	        output(finalMarks,__dirname+'/teamScores.csv');
        })
    });

prog.parse(process.argv);
