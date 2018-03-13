const chalk = require('chalk');
const { argv } = require('yargs');
const inquirer = require('inquirer');
const { log } = require('./logger');

async function triggerTask(task) {
    const { name } = task;
    log(name, 'task started', 'start');

    const result = await task();
    log(name, 'task finished', 'done');

    return result;
}

const createParallel = (...tasks) => async function parallel() {
    const result = await Promise.all(tasks.map(triggerTask));
    return result;
};

const createSeries = (...tasks) => async function series() {
    const results = [];

    for (const task of tasks) {
        const result = await triggerTask(task);
        results.push(result);
    }

    return results;
};

/**
 *
 * @param {Array.<{ name: String, handler: Function }>} tasks
 */
const createRunner = async (tasks = []) => {
    try {
        const task =
            tasks.find(({ name }) => (
                Object.prototype.hasOwnProperty.call(argv, name)
            )) ||
            await inquirer.prompt({
                type: 'list',
                name: 'taskName',
                message: 'what task',
                choices: tasks.map(t => t.name),
                filter: taskName => tasks.find(({ name }) => taskName === name),
            }).then(({ taskName }) => taskName);

        if (task) {
            log(chalk.bold(task.name), 'build started', 'start');
            const result = await triggerTask(task.handler);
            log(chalk.bold(task.name), 'build finished', 'done');

            return result;
        }

        throw new Error('no task found');
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    run: createRunner,
    parallel: createParallel,
    series: createSeries,
    log,
};
