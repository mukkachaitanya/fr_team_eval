const Promise = require("bluebird");
const stringify = require("./csvStringify");
const writeFile = Promise.promisify(require("fs").writeFile);

var writeCSVFile = function(content, csvFile) {
    var content = stringify(content);
    return writeFile(csvFile, content).catch(function(err) {
        console.log(err);
    });
};

module.exports = writeCSVFile;
