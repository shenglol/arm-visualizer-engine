var path = require('path');
var gulp = require('gulp');
var karma = require('karma');

function karmaFinishHandler(done) {
    return failCount => {
        done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
    };
}

function karmaSingleRun(done) {
    var configFile = path.join(process.cwd(), 'conf', 'karma.conf.js');
    var karmaServer = new karma.Server({ configFile }, karmaFinishHandler(done));
    karmaServer.start();
}

function karmaAutoRun(done) {
    var configFile = path.join(process.cwd(), 'conf', 'karma-auto.conf.js');
    var karmaServer = new karma.Server({ configFile }, karmaFinishHandler(done));
    karmaServer.start();
}

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);
