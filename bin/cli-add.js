#!/usr/bin/env node

const R = require('ramda');
const program = require('commander');
const chalk = require('chalk');
const repo = require('../src/repo');
const log = require('../src/log');

const validate = task => {
    if (!task) {
        throw new Error('Empty task');
    }
};

const add = async (task, branch) => {
    validate(task);

    const tasksList = R.append({ task }, await repo.read(branch));

    console.log(chalk.green(`Adding task: ${task}`));
    await repo.write(branch, tasksList);
};

program
    .option('-b, --branch [name]', 'use selected git branch')
    .parse(process.argv);

const task = R.trim(program.args.join(' '));

add(task, program.branch || 'master')
    .catch(log.error);