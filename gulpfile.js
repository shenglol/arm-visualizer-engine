var gulp = require('gulp');
var hub = require('gulp-hub');
var conf = require('./conf/gulp.conf');

hub([conf.path.gulp('*.js')]);

gulp.task('clean', gulp.parallel('clean:lib', 'clean:doc'));
gulp.task('build', gulp.series('clean', gulp.parallel('tslint', 'jshint'), 'compile'));
gulp.task('test', gulp.series('build', 'karma:single-run'));
gulp.task('test:auto', gulp.series('build', 'karma:auto-run'));
gulp.task('default', gulp.series('build'));
