const fs = require('fs');
const promisify = require('es6-promisify');
const path = require('path');

const getGitRepositoryDir = fileName => path.join(process.cwd(), '.git', fileName || '');

const isGitRepository = () => {
    const filePath = getGitRepositoryDir();
    const promise = new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stat) => {
            if (err) {
                return reject();
            }

            resolve(stat.isDirectory());
        });
    });

    return promise.catch(() => false);
};

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    isGitRepository,
    getGitRepositoryDir,
    readFile,
    writeFile,
};