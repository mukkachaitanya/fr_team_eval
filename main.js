#!/usr/bin/env node
const prog = require('caporal');
var Promise = require("bluebird");
var output = require('./output');
var eval_teamwise = require('./eval_teamwise');

prog
    .version('1.0.0')
    .description('Program to facilitate pairwise evaluation in CS F213 Labs')
    .argument('<teamcsv>', 'CSV Data for Teams')
    .argument('<scorescsv>', 'CSV Data for Scores')
    .action(function(args, options, logger)
            {
                if(Object.keys(args).length != 2){
	            logger.error("Usage: node main.js <path_to_team.csv_file>\
	                          <path_to_scores.csv_file>\n\nOutputs a\
	                          teamScores.csv file to the current directory");
                }
                eval_teamwise.writeResult(args);
            });

prog.parse(process.argv);
