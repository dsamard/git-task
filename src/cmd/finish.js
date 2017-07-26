const chalk = require('chalk');
const repo = require('../repo');
const log = require('../log');

const updateListItem = (taskIndex, value) =>
    list => list.map((item, index) => {
        return index === taskIndex ? Object.assign({}, item, value) : item;
    });

const finish = async (taskId, branch, undo) => {
    const entries = await repo.read(branch);
    const taskIndex = taskId - 1;
    const update = updateListItem(taskIndex, {
        finished: undo ? false : true,
    });

    if (!entries[taskIndex]) {
        throw new Error('Unknown task');
    }

    const { task } = entries[taskIndex];
    await repo.write(branch, update(entries));

    console.log(chalk.green(`${undo ? 'Unmarked' : 'Finished'}: ${task}`));
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
        .catch(log.error);
};