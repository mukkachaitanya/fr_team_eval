const Promise = require("bluebird");
const parser = Promise.promisify(require("csv-parse"));
const readFile = Promise.promisify(require("fs").readFile);
const mysql = require('mysql');
const _ = require("lodash");

var options = {
	trim: true,
	auto_parse: false,
	columns: header => {} /* eslint no-unused-vars : "off" */
};


/*
* Function fileContents reads the contents of a csv file and parses it
* @returnType Object of parser class
*/

var fileContents = function(file) {
    return readFile(file, "utf8").then(function(content) {
        return parser(content, options);
    });
};

var sqlRead = function(database, table) {
    var link = Promise.promisifyAll(
        mysql.createConnection({
            connectionLimit : 100, 
            host: "localhost",
            port: "3306",
            user: database.user,
            password: database.password,
            database: database.db  
        })
    );
    var content = [];
    return link.queryAsync("SELECT * FROM " + table)
        .then(function(rows) {
            if (rows.length !== 0) {
                content = _.map(rows, function(row) {
                    return _.values(row);
                });
            }
            else
                throw new Error("No contents in table " + table);

        })
        .then(function() {
            link.end();
            return content;            
        });
};

module.exports = {
    csvContents: fileContents,
    sqlContents: sqlRead
};
