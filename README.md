[![Build Status](https://travis-ci.org/mukkachaitanya/fr_team_eval.svg?branch=master)](https://travis-ci.org/mukkachaitanya/fr_team_eval) [![Test Coverage](https://codeclimate.com/github/mukkachaitanya/fr_team_eval/badges/coverage.svg)](https://codeclimate.com/github/mukkachaitanya/fr_team_eval/coverage)
# Team Evaluation
This tries to implement [FR-TEAM-EVAL](https://github.com/AutolabJS/AutolabJS/wiki/FR-Team-Evaluation) .

To run the program:

1. Install the required dependencies
```npm install```
or
```yarn```

2. Usage `node index.js <path_to_team.csv_file> <path_to_scores.csv_file>`

Outputs a teamScores.csv file to the current directory.

## Issues

1. Uses `csv` npm module. Instead need to implement a native parser.

~~2. Uses `bluebird` for promises and async. Can either try to use `async/await` or make the operations synchronous(not reccomended).~~ (Using bluebird)
3. Make the package more modular. Separate I/O and operations.
4. Handle invalid entries.

~~5. Write basic test~~
