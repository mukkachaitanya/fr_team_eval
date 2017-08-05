var Promise = require("bluebird");
var input = require('./input');
var output = require('./output');

if(process.argv.length<4){
	console.log("Usage: node index,js <path_to_team.csv_file> <path_to_scores.csv_file>\n\nOutputs a teamScores.csv file to the current directory");
	process.exit(1);
}

var teamCSV = process.argv[2];
var scoresCSV = process.argv[3];


const promiseMarks = input.csvContents(scoresCSV);
const promiseTeam = input.csvContents(teamCSV);

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

});	



