#!/usr/bin/env node

const yargs = require('yargs');

yargs.commandDir('./cmd')
    .demandCommand()
    .help()
    .option('b', {
        alias: 'branch',
        default: 'master',
        describe: 'use selected git branch',
        type: 'string',
    })
    .argv