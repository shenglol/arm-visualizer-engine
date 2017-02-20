'use strict';

module.exports = function (config) {
  var tsify = require('tsify');
  var configuration = {
    basePath: '',

    autoWatch: false,

    singleRun: true,

    colors: true,

    concurrency: Infinity,

    logLevel: config.LOG_INFO,

    frameworks: ['mocha', 'chai', 'browserify'],

    reporters: ['mocha'],

    mochaReporter: {
      showDiff: true,
    },

    files: [
      '../typings/index.d.ts',
      '../src/**/*.ts',
      '../test/**/*.ts'
    ],

    preprocessors: {
      '../typings/index.d.ts': ['browserify'],
      '../src/**/*.ts': ['browserify'],
      '../test/**/*.ts': ['browserify']
    },

    browsers: ['PhantomJS'],

    browserify: {
      debug: true,
      plugin: [tsify],
      extensions: ['.ts', '.js']
    }
  };

  config.set(configuration);
};
