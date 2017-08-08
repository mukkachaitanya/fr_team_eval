const Promise = require("bluebird");
const stringify = require("./csvStringify");
const writeFile = Promise.promisify(require("fs").writeFile);

// Writes the contents to the csvFile param
var writeCSVFile = function(content, csvFile) {
    var content = stringify(content);
    return writeFile(csvFile, content).catch(function(err) {
        console.log(err);
    });
};

module.exports = writeCSVFile;
