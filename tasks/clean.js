const rimraf = require('rimraf');
const { parallel } = require('./utils/orchestrator');
const config = require('./config');


const cleanFolder = folderPath => new Promise((resolve) => {
    rimraf(folderPath, resolve);
});

const cleanBuild = () => cleanFolder(config.folders.build);
const cleanDist = () => cleanFolder(config.folders.dist);
const cleanDir = parallel(cleanBuild, cleanDist);

module.exports = {
    cleanDir,
};
