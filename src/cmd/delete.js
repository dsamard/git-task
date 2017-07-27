const chalk = require('chalk');
const log = require('../log');
const repo = require('../repo');
const listTasks = require('../listTasks');

const deleteTask = async (branch, id) => {
    const list = await repo.read(branch);
    const predicate = (item, index) => index !== (id - 1);

    console.log(chalk.green('Removing task'));
    await repo.write(branch, list.filter(predicate));
};

exports.command = 'delete <id>';
exports.desc = 'Delete task';
exports.handler = ({ branch, id }) => deleteTask(branch, id)
    .then(() => listTasks(branch))
    .catch(log.error);