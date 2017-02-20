'use strict';

const path = require('path');

exports.files = {
  gulp: 'gulpfile.js',
  typings: 'typings/index.d.ts'
};

exports.paths = {
  src: 'src',
  test: 'test',
  lib: 'lib',
  doc: 'doc',
  gulp: 'gulp',
  conf: 'conf',
};

exports.path = {};
for (const pathName in exports.paths) {
  /* jshint loopfunc: true */
  if (exports.paths.hasOwnProperty(pathName)) {
    exports.path[pathName] = function pathJoin() {
      const pathValue = exports.paths[pathName];
      const funcArgs = Array.prototype.slice.call(arguments);
      const joinArgs = [pathValue].concat(funcArgs);
      return path.join.apply(this, joinArgs);
    };
  }
}
