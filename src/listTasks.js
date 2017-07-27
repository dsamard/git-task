const chalk = require('chalk');
const Table = require('cli-table');
const moment = require('moment');
const repo = require('./repo');

module.exports = async branch => {
    const tasks = await repo.read(branch);
    const table = new Table({
        head: ['', 'id', 'task', 'created'],
        chars: {
            top: ' ', 'top-mid': ' ', 'top-left': ' ', 'top-right': ' ',
            left: '', 'left-mid': '',
            right: '', 'right-mid': '',
            mid: '', 'mid-mid': '',
            bottom: ' ', 'bottom-mid': ' ', 'bottom-left': ' ', 'bottom-right': ' ',
        }
    });

    tasks.forEach(item => {
        const finished = item.finished ? chalk.green('✓') : ' ';
        table.push([finished, item.id, item.task, moment(item.createdAt).fromNow()]);
    });

    console.log(table.toString());
};