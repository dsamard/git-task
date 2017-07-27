const listTasks = require('../listTasks');

exports.command = 'list';
exports.aliases = ['l'];
exports.desc = 'List created tasks';
exports.handler = argv => listTasks(argv.branch);