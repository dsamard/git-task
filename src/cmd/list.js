#!/usr/bin/env node

const R = require('ramda');
const chalk = require('chalk');
const Table = require('cli-table');
const moment = require('moment');
const repo = require('../repo');
const log = require('../log');

const list = async branch => {
    const tasks = await repo.read(branch);
    const table = new Table({
        head: ['id', 'task', 'created'],
        chars: {
            top: ' ', 'top-mid': ' ', 'top-left': ' ', 'top-right': ' ',
            left: '', 'left-mid': '',
            right: '', 'right-mid': '',
            mid: '', 'mid-mid': '',
            bottom: ' ', 'bottom-mid': ' ', 'bottom-left': ' ', 'bottom-right': ' ',
        }
    });

    tasks.forEach((item, index) => {
        table.push([index + 1, item.task, moment(item.createdAt).fromNow()]);
    });

    console.log(table.toString());
};

exports.command = 'list';
exports.aliases = ['*'];
exports.desc = 'List created tasks';
exports.builder = yargs => { };
exports.handler = argv => {
    list(argv.branch)
        .catch(log.error);
};