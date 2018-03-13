const chalk = require('chalk');
const createTimestamp = require('./create-timestamp');

function log(taskName = 'undefined', message, t = 'log') {
    const types = {
        log: { color: 'magenta', symbol: '•' },
        start: { color: 'yellow', symbol: '+' },
        done: { color: 'green', symbol: '-' },
        error: { color: 'red', symbol: 'x' },
    };
    const type = types[t] || types.log;

    const string = [
        chalk[type.color](type.symbol),
        chalk.grey(`[${chalk.grey(createTimestamp())}]`),
        taskName && chalk[type.color](taskName),
        chalk.grey('-'),
        message,
    ].filter(Boolean).join(' ');

    process.stdout.write(string);
    process.stdout.write('\n');
}

module.exports = {
    log,
}
