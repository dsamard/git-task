const listTasks = require('../listTasks');

exports.command = 'list';
exports.aliases = ['*'];
exports.desc = 'List created tasks';
exports.handler = argv => listTasks(argv.branch);