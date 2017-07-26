const fs = require('fs');
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

module.exports = {
    isGitRepository,
    getGitRepositoryDir,
};