const R = require('ramda');
const chalk = require('chalk');
const log = require('../log');
const repo = require('../repo');
const listTasks = require('../listTasks');

const deleteTask = async (branch, id) => {
    const list = await repo.read(branch);

    console.log(chalk.green('Removing task'));
    await repo.write(branch, R.reject(R.propEq('id', id), list));
};

exports.command = 'delete <id>';
exports.desc = 'Delete task';
exports.handler = ({ branch, id }) => deleteTask(branch, id)
    .then(() => listTasks(branch))
    .catch(log.error);