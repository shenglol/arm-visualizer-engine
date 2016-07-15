var gulp = require('gulp');
var conf = require('../conf/gulp.conf');
var tsConf = require('../tsconfig.json');
var $ = require('gulp-load-plugins')({ lazy: true });

function compile() {
    return gulp.src([conf.path.src('**/*.ts'), conf.files.typings])
        .pipe($.tsc(tsConf.compilerOptions))
        .pipe(gulp.dest(conf.path.lib()));
}

gulp.task('compile', compile);
