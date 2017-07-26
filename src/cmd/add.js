const R = require('ramda');
const chalk = require('chalk');
const repo = require('../repo');
const log = require('../log');
const listTasks = require('../listTasks');

const validate = task => {
    if (!task) {
        throw new Error('Empty task');
    }
};

const add = async (task, branch) => {
    validate(task);

    const createdAt = +new Date();
    const tasksList = R.append({ task, createdAt, finished: false }, await repo.read(branch));

    console.log(chalk.green(`Created: ${task}`));
    await repo.write(branch, tasksList);
};

exports.command = 'add <task...>';
exports.aliases = ['a'];
exports.desc = 'Add task';
exports.builder = yargs => { };
exports.handler = argv => {
    const task = R.trim(argv.task.join(' '));

    add(task, argv.branch)
        .then(() => listTasks(argv.branch))
        .catch(log.error);
};