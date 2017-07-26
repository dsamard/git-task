const fs = require('fs');
const promisify = require('es6-promisify');
const R = require('ramda');
const fsUtils = require('./fs');

const repoFile = fsUtils.getGitRepositoryDir('tasks.json');

const read = branch => promisify(fs.readFile)(repoFile)
    .then(JSON.parse)
    .then(R.prop(branch))
    .then(R.defaultTo([]))
    .catch(() => []);
    
const readAll = () => promisify(fs.readFile)(repoFile)
    .then(JSON.parse)
    .catch(() => {});

const write = async (branch, entries) => {
    const items = await readAll();
    const itemsToWrite = Object.assign({}, items, {
        [branch]: entries,
    });
    
    return promisify(fs.writeFile)(repoFile, JSON.stringify(itemsToWrite))
        .then(R.always(itemsToWrite));
};

module.exports = {
    read,
    write,
};