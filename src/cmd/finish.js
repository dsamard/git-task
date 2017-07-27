const R = require('ramda');
const chalk = require('chalk');
const repo = require('../repo');
const log = require('../log');
const listTasks = require('../listTasks');

const finish = async (taskId, branch, undo) => {
    const entries = await repo.read(branch);
    const task = entries.find(R.propEq('id', taskId));

    if (!task) {
        throw new Error('Unknown task');
    }

    await repo.updateTask(branch, taskId, {
        finished: undo ? false : true,
    });

    console.log(chalk.green(`${undo ? 'Unmarked' : 'Finished'}: ${task.task}`));
};

exports.command = 'finish <id>';
exports.aliases = ['f'];
exports.desc = 'Finish task';
exports.builder = yargs => yargs.option('u', {
    alias: 'undo',
    describe: 'undo marking as finished',
    type: 'boolean',
});
exports.handler = argv => {
    finish(argv.id, argv.branch, argv.undo)
        .then(() => listTasks(argv.branch))
        .catch(log.error);
};