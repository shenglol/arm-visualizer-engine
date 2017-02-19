var gulp = require('gulp');
var del = require('del');
var conf = require('../conf/gulp.conf');

function cleanLib() {
  return del([
    conf.path.lib()
  ]);
}

function cleanDoc() {
  return del([
    conf.path.doc()
  ]);
}

gulp.task('clean:lib', cleanLib);
gulp.task('clean:doc', cleanDoc);
