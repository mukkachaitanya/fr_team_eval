#!/usr/bin/env node
const prog = require("caporal");
const Promise = require("bluebird");
const output = require("./output");
const eval_teamwise = require("./eval_teamwise");

prog
    .version("1.0.0")
    .description("Program to facilitate pairwise evaluation in CS F213 Labs")
    .argument("<teamcsv>", "CSV Data for Teams")
    .argument("<scorescsv>", "CSV Data for Scores")
    .argument("[teamScorescsv]", "CSV file to store evaluations")
    .option('--sql <database>', prog.LIST)
    .action(function(args, options, logger) {
        if(typeof options.sql !== 'undefined')
            args.database = options.sql;
        eval_teamwise.writeResult(args, logger);
    });

prog.parse(process.argv);
