#!/usr/bin/env node

const yargs = require('yargs');
const repo = require('./src/repo');
const log = require('./src/log');

const main = async () => {
    const branch = await repo.getCurrentBranch();

    yargs.commandDir('./src/cmd')
        .demandCommand()
        .help()
        .option('b', {
            alias: 'branch',
            default: branch,
            describe: 'use selected git branch',
            type: 'string',
        })
        .argv
};

main().catch(log.error);