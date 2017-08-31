# Contributing

Pick/Create an issue before working on them. Give a PR.

Make sure to `npm lint` and `npm test` before commiting files. (Use `./node_modules/.bin/eslint --fix .` to fix common errors)

Use the rebase workflow in PR's to avoid merge commits :
- Pull and rebase the latest changes on the `upstream/master` :
	`git pull --rebase upstream master`
- Resolve merge coflicts if any
- Push the changes to your origin branch
	`git push -u origin <branch>`