const Promise = require("bluebird");
const parser = Promise.promisify(require("csv-parse"));
const readFile = Promise.promisify(require("fs").readFile);
const mysql = require('mysql');
const _ = require("lodash");


class Input {
    constructor(){

    }

    read(args){
        
    }
}

class CsvInput extends Input{
    constructor(){
        super();
        this.options = {
            trim: true,
            auto_parse: false,
            columns: this.setHeaders.bind(this)  
        };
    }

    read(file){
        return readFile(file, "utf8").then(this.parse.bind(this));
    }

    parse(content){
        return parser(content, this.options);
    }

    setHeaders(headers){
        this.headers = headers;
    }
} 

class SQLInput extends Input{
    constructor(database){
        super();
        this.link = Promise.promisifyAll(
            mysql.createConnection({
                connectionLimit : 100, 
                host: "localhost",
                port: "3306",
                user: database.user,
                password: database.password,
                database: database.db  
            })
        );
    }

    read(table){
        return this.link.queryAsync("SELECT * FROM " + table)
        .then(this.parse.bind(this))
        .then(this.endLink.bind(this))
        .then(()=>{return this.content});
    }

    parse(rows){
        if(rows.length !== 0) {
            this.content = _.map(rows, function(row) {
                return _.values(row);
            });
        }
        else
            throw new Error("No contents in table " + table); 
    }
    endLink(){
        this.link.end();
    }
}


module.exports = function(type, args) {
    return type==='sql' ? new SQLInput(args) : new CsvInput(args);
}
