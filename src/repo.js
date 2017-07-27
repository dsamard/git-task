const promisify = require('es6-promisify');
const R = require('ramda');
const childProcess = require('child_process');
const fsUtil = require('./fs');

const repoFile = fsUtil.getGitRepositoryDir('tasks.json');
const exec = promisify(childProcess.exec);

const appendId = (item, index) => Object.assign({}, item, {
    id: index + 1,
});

const read = branch => fsUtil.readFile(repoFile)
    .then(JSON.parse)
    .then(R.prop(branch))
    .then(R.defaultTo([]))
    .then(R.addIndex(R.map)(appendId))
    .catch(() => []);

const readAll = () => fsUtil.readFile(repoFile)
    .then(JSON.parse)
    .catch(R.always({}));

const write = async (branch, entries) => {
    const items = await readAll();
    const itemsToWrite = Object.assign({}, items, {
        [branch]: entries,
    });

    return fsUtil.writeFile(repoFile, JSON.stringify(itemsToWrite))
        .then(R.always(itemsToWrite));
};

const getCurrentBranch = () => exec('git rev-parse --abbrev-ref HEAD')
    .then(R.trim);

const updateTask = async (branch, taskId, data) => {
    const list = await read(branch);
    const newList = list.map(item =>
        Object.assign({}, item, item.id === taskId ? data : {})
    );

    return write(branch, newList);
};

module.exports = {
    read,
    write,
    getCurrentBranch,
    updateTask,
};