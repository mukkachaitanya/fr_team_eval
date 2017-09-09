const Promise = require("bluebird");
const mysql=require("mysql");

var insMarks=function(connection,content,tableName,headers){
    var insertMarks=
        `INSERT INTO ${tableName}  (${headers[0]},${headers[1]}) VALUES ? ` ;
     connection.query(insertMarks, [content],function(err)
                                        {if(err) 
                                          throw new Error(err);
                                        });
                                      }
var outputTable=function(database,content,tableName){
  var connection =
       Promise.promisifyAll(
      mysql.createConnection({
          connectionLimit : 100,
          host: "localhost",
          port: "3306",
          user: database.user,
          password: database.password,
          database: database.db
      }));
      var headers=content.shift();
      var sql = `CREATE TABLE ${tableName} IF NOT EXISTS (${headers[0]} VARCHAR(12),${headers[1]} INT`;
      connection.queryAsync(sql)
          .then(function(){
             insMarks(connection,content,tableName,headers);
          });


}
module.exports =outputTable;
