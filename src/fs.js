const fs = require('fs');
const promisify = require('es6-promisify');
const path = require('path');

const getGitRepositoryDir = fileName => path.join(process.cwd(), '.git', fileName || '');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const symlink = promisify(fs.symlink);
const stat = promisify(fs.stat);

module.exports = {
    getGitRepositoryDir,
    readFile,
    writeFile,
    symlink,
    stat,
};