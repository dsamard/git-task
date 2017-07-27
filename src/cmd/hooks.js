const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const promisify = require('es6-promisify');
const log = require('../log');

const hookFiles = ['commit-msg.hook.js', 'prepare-commit-msg.hook.js'];
const hooks = hookFiles.map(name => ({
    path: path.resolve(__dirname, `../../hook/${name}`),
    name: name.replace('.hook.js', ''),
}));

const symlink = promisify(fs.symlink);
const fileExists = path => promisify(fs.stat)(path)
    .then(() => true)
    .catch(() => false);

const status = {
    HOOK_EXISTS: Symbol(),
    HOOK_CREATED: Symbol(),
    SYMLINK_FAILED: Symbol(),
};

const installSingleHook = async hook => {
    const dest = path.resolve(process.cwd(), '.git/hooks', hook.name);
    const exists = await fileExists(dest);

    if (exists) {
        return { status: status.HOOK_EXISTS, hook };
    }

    return symlink(hook.path, dest)
        .then(() => ({ status: status.HOOK_CREATED, hook }))
        .catch(() => ({ status: status.SYMLINK_FAILED, hook }));
};

const displayResult = result => {
    const halp = hook => {
        console.log('');
        console.log('Now, you need to manually add hook.');
        console.log(`Path to hook: ${chalk.yellow(hook.path)}`);
        console.log('Good luck :)');
        console.log('');
    };

    switch (result.status) {
        case status.HOOK_CREATED:
            console.log(`Created ${chalk.green(result.hook.name)} hook`);
            break;

        case status.HOOK_EXISTS:
            console.log(`Hook ${chalk.blue(result.hook.name)} is defined in this repo`);
            halp(result.hook);
            break;

        case status.SYMLINK_FAILED:
            console.log(`${chalk.red('Failed to symlink')} ${result.hook.name} hook`);
            halp(result.hook);
            break;
    }
};

const installHooks = async () => {
    const results = await Promise.all(hooks.map(installSingleHook));
    
    results.forEach(displayResult);
};

exports.command = 'hooks';
exports.desc = 'Install GIT hooks';
exports.handler = argv => {
    installHooks()
        .catch(log.error);
};