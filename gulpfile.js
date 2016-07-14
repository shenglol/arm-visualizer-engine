'use strict';

var conf = require('./gulp.conf')
var tsconfig = require('./tsconfig.json');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var karma = require('karma');
var stylish = require('tslint-stylish');
var $ = require('gulp-load-plugins')();

function clean() {
    return del([conf.paths.lib]);
}

function lint() {
    return gulp.src(conf.paths.src)
        .pipe($.tslint())
        .pipe($.tslint.report(stylish, {
            emitError: false,
            sort: true,
            bell: false
        }));
}

function compile() {
    return gulp.src([conf.paths.src, conf.paths.typings])
        .pipe($.tsc(tsconfig.compilerOptions))
        .pipe(gulp.dest(conf.paths.lib));
}

function karmaFinishHander(done) {
    return failCount => {
        done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
    }
}

function karmaSingleRun(done) {
    const configFile = path.join(process.cwd(), 'karma.conf.js');
    const karmaServer = new karma.Server({ configFile }, karmaFinishHander(done));
    karmaServer.start();
}

gulp.task('test', gulp.series(karmaSingleRun));

gulp.task('clean', clean);

gulp.task('build', gulp.series(clean, lint, compile));

gulp.task('default', gulp.series('build'));
