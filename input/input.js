const Promise = require('bluebird');
const parser = require('./csvParse');
const mysql = require('mysql');
const readFile = Promise.promisify(require('fs').readFile);

/*
* Function fileContents reads the contents of a csv file and parses it
* @returnType Object of parser class
*/

var fileContents = function(file) {

	return readFile(file,'utf8').then(function(content) {
		return new parser(content);
	});
};


var sqlRead = function(database, table) {
    return new Promise(function(resolve, reject) {
        var link = mysql.createConnection({
                        host:'localhost',
                        port:'3306',
                        user:'root',
                        password:'root',
                        database:database
                   });
        link.connect(function(error){
                     if(error){
                        console.log(error);
                     }});
        link.query("SELECT * FROM "+table, function(err, rows, fields){
            objs = []
            if(rows.length !== 0){
                for(var i = 0;i < rows.length;i++)
                {
                    if(table === 'team')
                        objs.push([rows[i].studentID, rows[i].teamID])
                    else
                        objs.push([rows[i].studentID, rows[i].score])
                }
                resolve(objs);
            }
            else {
                reject(err);
            }
        });
        link.end();
    });
}

module.exports = {
	csvContents : fileContents,
	sqlContents : sqlRead
}
