const Promise = require("bluebird");
const parser = require("./csvParse");

const _ = require("lodash");
const mysql = require("mysql");
const readFile = Promise.promisify(require("fs").readFile);

/*
* Function fileContents reads the contents of a csv file and parses it
* @returnType Object of parser class
*/

var fileContents = function(file) {
    return readFile(file, "utf8").then(function(content) {
        return new parser(content);
    });
};

var sqlRead = function(database, table) {
    var link = Promise.promisifyAll(
        mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            database: database  
        })
    );
    var content = [];
    return link.queryAsync("SELECT * FROM " + table)
        .then(function(rows, fields) {
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
        }).catch(err => { console.error(err); });
};

module.exports = {
    csvContents: fileContents,
    sqlContents: sqlRead
};
