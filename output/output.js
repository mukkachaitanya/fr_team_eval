const Promise = require("bluebird");
const stringify = Promise.promisify(require("csv-stringify"));
const writeFile = Promise.promisify(require("fs").writeFile);


class Output {

    writeContents(args){
        return this.write(args);
    }
}

class CSVWrite extends Output{

	constructor(content, csvFile){
		super();
		this.content = content;
		this.csvFile = csvFile;	
	}

	write(){
		return stringify(this.content)
				.then(res => writeFile(this.csvFile, res, {flag: 'w'}).bind(this));

	}

}
module.exports = CSVWrite;
