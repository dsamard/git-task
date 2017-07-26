#!/usr/bin/env node

const program = require('commander');

program.version('0.1.0')
    .command('add', 'Add new task');

program.parse(process.argv);