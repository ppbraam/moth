const { run, series } = require('./utils/orchestrator');
const { startServer } = require('./server');
const { buildFiles } = require('./webpack');
const { cleanDir } = require('./clean');
const { mergeFolders } = require('./bundle');
const { setupConfig } = require('./config');


const clean = cleanDir;
const serve = series(setupConfig, cleanDir, startServer);
const build = series(setupConfig, cleanDir, buildFiles);
const bundle = series(setupConfig, build, mergeFolders);

run([
    { name: 'serve', handler: serve },
    { name: 'build', handler: build },
    { name: 'bundle', handler: bundle },
    { name: 'clean', handler: clean },
]);
