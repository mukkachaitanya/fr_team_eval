/* eslint no-unused-vars : "off" */
const Promise = require("bluebird");

const seneca = require("seneca")();

/*  Config is expected to be of this form
*   {
        role: "evaluate",
        cmd: "team",
*       [sqlConfig : {
*           db : Name of the user MySQL database
*           user : Name of the user
*           password : Password of the above user
*       }],
*       teams : Path to teams csv file or table name if sqlConfig specified
*       scores : Path to teams csv file or table name if sqlConfig specified
*       [teamScorescsv: Path to final marks list ]  
*   }
*/

// post the request (config) at http://localhost:PORT/act

/* eslint no-process-env: "off"*/
/* eslint no-undef : "off"*/

seneca
    .use("senecaAPI") // equivalent to saying require("./senecaAPI")
    .listen({
        type: "http", // communicate via http
        port: process.env.PORT || "8260", // listen at this port
        pin: "role:evaluate" // listen only this pin pattern
    });
