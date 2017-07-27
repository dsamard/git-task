#!/usr/bin/env node

const R = require('ramda');
const fsUtil = require('../src/fs');
const repo = require('../src/repo');
const log = require('../src/log');
const listTasks = require('../src/listTasks');

if (process.argv.length > 3) {
    process.exit(0);
}

const [msgFile] = process.argv.slice(-1);

const pattern = 'git-task#(\\d+)';

const findTaskId = R.pipe(
    R.split(/\r?\n/),
    R.reject(R.test(/^#/)),
    R.join('\n'),
    R.match(new RegExp(pattern)),
    R.cond([
        [R.isEmpty, R.always(null)],
        [R.T, R.compose(parseInt, R.nth(1))],
    ])
);

const finishTask = async () => {
    const branch = await repo.getCurrentBranch();
    const tasks = await repo.read(branch);

    const message = (await fsUtil.readFile(msgFile)).toString();
    const taskId = findTaskId(message);

    if (!taskId) {
        return false;
    }

    const taskExists = tasks.some(({ id }) => id === taskId);

    if (!taskExists) {
        return false;
    }

    await repo.updateTask(branch, taskId, { finished: true });
    await fsUtil.writeFile(msgFile, message.replace(new RegExp(pattern, 'g'), ''));

    return true;
};

finishTask()
    .then(async result => {
        if (!result) {
            return;
        }

        const branch = await repo.getCurrentBranch();
        listTasks(branch);
    })
    .catch(err => {
        log.error(err);
        process.exit(1);
    });