const R = require('ramda');
const chalk = require('chalk');
const log = require('../log');
const repo = require('../repo');
const listTasks = require('../listTasks');

const prune = async branch => {
    const list = await repo.read(branch);
    const finished = R.compose(R.equals(true), R.prop('finished'));

    console.log(chalk.green('Removing finished tasks'));
    await repo.write(branch, R.reject(finished, list));
};

exports.command = 'prune';
exports.desc = 'Remove finished tasks';
exports.handler = ({ branch }) => prune(branch)
    .then(() => listTasks(branch))
    .catch(log.error);