var Promise = require("bluebird");


if(process.argv.length<4){
	console.log("Usage: node index,js <path_to_team.csv_file> <path_to_scores.csv_file>\n\nOutputs a teamScores.csv file to the current directory");
	process.exit(1);
}

var teamCSV = process.argv[2];
var scoresCSV = process.argv[3];

var parse = Promise.promisify(require("csv-parse"));
var stingify = Promise.promisify(require('csv-stringify'));
var fs = Promise.promisifyAll(require("fs"));

var parser = parse({ delimiter: "," });

var options = {
	trim: true,
	auto_parse: false,
	columns: function(headers) {
		console.log("headers:" + headers);
	}
};

function getCSVContents(csvFile) {
	// body...
	return fs.readFileAsync(csvFile).then(function(file) {
		return parse(file, options)
			.then(function(rows) {
				var content = rows;
				return content;
			})
			.catch(function(err) {
				console.error(err);
			});
	});
}

function writeCSVFile(content, csvFile) {

	return stingify(content).then(function(res) {
		return fs.writeFileAsync(csvFile,res).catch(function(err) {
			console.log(err);
		});
	});
}

const promiseMarks = getCSVContents(scoresCSV);
const promiseTeam = getCSVContents(teamCSV);

var marks, team;

Promise.all([promiseMarks, promiseTeam]).then(function(res) {
	marks = res[0];
	teams = res[1];

	var teamView = {};

	teams.map(function(tuple) {

		if(!teamView.hasOwnProperty(tuple[1])) teamView[tuple[1]]=[];

		teamView[tuple[1]].push(tuple[0]);
	});


	var marksView={};

	marks.map(function(tup) {
		marksView[tup[0]] = parseFloat(tup[1]);
	});

	var finalMarks = [['id','score']];

	// console.log(marksView);
	// console.log(teamView);

	for(team in teamView){
		var members = teamView[team];
		var memberScores = [];

		for(member of members)
			memberScores.push(marksView[member] || 0);
		console.log(memberScores);
		var maxScore = memberScores.reduce(function(a,b) {
			return a<b? b:a;
		});

		for(member of members)
			finalMarks.push([member,maxScore]);
	}

	writeCSVFile(finalMarks,__dirname+'/teamScores.csv');

});	



