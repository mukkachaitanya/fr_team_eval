var Promise = require("bluebird");
var stringify = require("./csvStringify");
var writeFile = Promise.promisify(require("fs").writeFile);

var writeCSVFile = function(content, csvFile) {
    var content = stringify(content);
    return writeFile(csvFile, content).catch(function(err) {
        console.log(err);
    });
};

module.exports = writeCSVFile;
