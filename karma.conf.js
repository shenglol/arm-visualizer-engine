'use strict';

module.exports = function (config) {
    const tsify = require('tsify');
    const configuration = {
        basePath: '',
        autoWatch: false,
        singleRun: true,
        colors: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'browserify'
        ],
        files: [
            'typings/index.d.ts',
            'src/**/*.ts',
            'test/**/*.ts'
        ],
        browsers: ['PhantomJS'],
        browserify: {
            debug: true,
            plugin: [tsify],
            extensions: ['.ts', '.js']
        },
        preprocessors: {
            'typings/index.d.ts': ['browserify'],
            'src/**/*.ts': ['browserify'],
            'test/**/*.ts': ['browserify']
        },
        reporters: ['mocha']
    };

    config.set(configuration);
};
