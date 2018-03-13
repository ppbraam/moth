const inquirer = require('inquirer');
const { argv } = require('yargs');
const path = require('path');


const hasArgv = key => Object.prototype.hasOwnProperty.call(argv, key);
const getArgv = (key, fallback) => {
    if (hasArgv(key)) {
        if (Array.isArray(argv[key])) {
            return argv[key][argv[key].length - 1];
        }
        return argv[key];
    }
    return typeof fallback === 'function' ? fallback() : fallback;
};

const createConfig = () => {
    const config = {
        port: getArgv('port', 1337),
        open: getArgv('open', false),
        production: getArgv('production', false),
        hmrEnabled: !argv.production || false,
        publicPath: '/',
        folders: {
            source: path.resolve(__dirname, '../source'),
            public: path.resolve(__dirname, '../public'),
            build: path.resolve(__dirname, '../_build'),
            dist: path.resolve(__dirname, '../_dist'),
        },
    };

    async function setupConfig() {
        process.env.NODE_ENV = config.production ? 'production' : 'development';
    }

    config.setupConfig = setupConfig;

    return config;
};

module.exports = createConfig();
