const chalk = require('chalk');

const error = err => console.log(chalk.red(err));

module.exports = {
    error,
};