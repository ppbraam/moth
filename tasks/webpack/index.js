const webpack = require('webpack');
const { createConfig } = require('./create-config');

const createCompiler = webpackConfig => webpack(webpackConfig);

const buildFiles = () => new Promise((resolve, reject) => {
    const webpackConfig = createConfig();
    const compiler = createCompiler(webpackConfig);

    compiler.run((err, stats) => {
        if (err) {
            reject(err);
        } else {
            console.log(stats.toString({
                colors: true,
                chunks: false,
            }));
            resolve();
        }
    });
});

module.exports = {
    createConfig,
    createCompiler,
    buildFiles,
};
