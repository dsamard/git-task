#!/usr/bin/env node

const R = require('ramda');
const fs = require('fs');
const promisify = require('es6-promisify');
const repo = require('../src/repo');
const log = require('../src/log');

if (process.argv.length > 3) {
    process.exit(0);
}

const [msgFile] = process.argv.slice(-1);

const taskToLine = ({ task, id }) => `# ${task} git-task#${id}`;

const buildMessage = tasks => (`
# Below is list of current tasks.
#
# You can use one of them as commit subject.
# Simply copy selected line to the first line of commit message,
# and uncomment it.
#
# Don't worry about '(finished #N)' postfix, it will be removed.
# Selected task will be marked as finished.
#
${tasks.map(taskToLine).join('\n')}
`);

const setCommitMessage = async () => {
    const branch = await repo.getCurrentBranch();
    const tasks = (await repo.read(branch))
        .filter(R.propEq('finished', false));

    if (!tasks.length) {
        process.exit(0);
    }

    const commitMsg = await promisify(fs.readFile)(msgFile);
    const body = buildMessage(tasks);

    await promisify(fs.writeFile)(msgFile, `${body}${commitMsg}`);
    process.exit(0);
};

setCommitMessage()
    .catch(err => {
        log.error(err);
        process.exit(1);
    });