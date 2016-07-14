'use strict';

var conf = require('./gulp.conf')
var tsconfig = require('./tsconfig.json');
var gulp = require('gulp');
var del = require('del');
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

gulp.task(clean);

gulp.task('build', gulp.series(clean, lint, compile));

gulp.task('default', gulp.series('build'));

