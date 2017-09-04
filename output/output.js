const Promise = require("bluebird");
const stringify = Promise.promisify(require("csv-stringify"));
const writeFile = Promise.promisify(require("fs").writeFile);


class Output {
    constructor(){

    }

    write(args){
        
    }
}

class CSVWrite extends Output{

	constructor(){
		super();	
	}

	write(content, csvFile){

		return stringify(content).then(function(res) {
			writeFile(csvFile, res)
		});
	}

}
module.exports = new CSVWrite();
