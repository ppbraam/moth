const browserSync = require('browser-sync');
const compression = require('compression');
const historyApiFallback = require('connect-history-api-fallback');
const createWebpackDevMiddleware = require('webpack-dev-middleware');
const createWebpackHotMiddleware = require('webpack-hot-middleware');
const { createCompiler, createConfig } = require('../webpack');
const config = require('../config');
const { log } = require('../utils/orchestrator');


const startServer = () => new Promise((resolve, reject) => {
    const server = browserSync.create();
    const webpackConfig = createConfig();
    const compiler = createCompiler(webpackConfig);

    function RefreshFilesPlugin() {
        function apply(webpackCompiler) {
            webpackCompiler.plugin(['run', 'watch-run'], (c, callback) => {
                log('webpack', 'start compiling');
                callback();
            });
            webpackCompiler.plugin('after-emit', (compilation, callback) => {
                log('webpack', 'done compiling');
                if (!config.hmrEnabled) {
                    server.reload('*.css');
                }
                callback();
            });
        }

        return { apply };
    }

    compiler.apply(new RefreshFilesPlugin());

    server.init({
        open: config.open,
        port: config.port,
        middleware: [
            compression(),
            historyApiFallback(),
            createWebpackDevMiddleware(compiler, {
                publicPath: '/',
                stats: 'errors-only',
                noInfo: true,
            }),
            config.hmrEnabled && createWebpackHotMiddleware(compiler, {
                log: false,
            }),
        ].filter(Boolean),
        server: {
            baseDir: config.folders.public,
        },
        logLevel: false,
        files: ['**/*.(html|css)'],
    }, (err, bs) => {
        if (err) reject(err);

        const port = bs.options.get('port');
        const message = `is running at http://localhost:${port}`;

        log('server', message);
        resolve();
    });
});

exports.startServer = startServer;
