var conf = require('../conf/gulp.conf');
var gulp = require('gulp');
var tslintStylish = require('tslint-stylish');
var jshintStylish = require('jshint-stylish');
var $ = require('gulp-load-plugins')({ lazy: true });

function tslint() {
    return gulp.src(conf.path.src('**/*.ts'))
        .pipe($.tslint())
        .pipe($.tslint.report(tslintStylish, {
            emitError: false,
            sort: true,
            bell: false
        }));
}

function jshint() {
    return gulp.src([conf.files.gulp, conf.path.gulp('*.js'), conf.path.conf('*.js')])
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
}

gulp.task('tslint', tslint);
gulp.task('jshint', jshint);
