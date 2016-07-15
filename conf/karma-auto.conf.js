'use strict';

module.exports = function (config) {
    var tsify = require('tsify');
    var configuration = {
        basePath: '',
        autoWatch: true,
        singleRun: false,
        colors: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'browserify'
        ],
        files: [
            '../typings/index.d.ts',
            '../src/**/*.ts',
            '../test/**/*.ts'
        ],
        browsers: ['PhantomJS'],
        browserify: {
            debug: true,
            plugin: [tsify],
            extensions: ['.ts', '.js']
        },
        preprocessors: {
            '../typings/index.d.ts': ['browserify'],
            '../src/**/*.ts': ['browserify'],
            '../test/**/*.ts': ['browserify']
        },
        reporters: ['mocha']
    };

    config.set(configuration);
};
