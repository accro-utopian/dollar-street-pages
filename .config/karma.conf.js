'use strict';

const webpackConfig = require('./webpack-karma.config');
module.exports = function (config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine'],

    files: [
      {pattern: 'test.bundle.js', watched: false}
    ],
    proxies: {
      '/app/assets/img/': 'http://localhost:3000/app/assets/img'
    },
    // list of files to exclude
    exclude: [],

    preprocessors: {
      'test.bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' },
        {type: 'lcov', subdir: 'report-lcov'}
      ]
    },
    webpackServer: {noInfo: true},

    reporters: ['progress', 'coverage'] ,

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
