const { ncp } = require('ncp');
const { series } = require('./utils/orchestrator');
const config = require('./config');

const copyFolder = (source, destination) => () => new Promise((resolve, reject) => {
    ncp(source, destination, (err) => {
        if (err) reject(err);

        resolve();
    });
});

const copyBuild = copyFolder(config.folders.build, config.folders.dist);
const copyPublic = copyFolder(config.folders.public, config.folders.dist);
const mergeFolders = series(copyPublic, copyBuild);


module.exports = {
    mergeFolders,
};

