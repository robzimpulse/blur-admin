'use strict';

let path = require('path');
let gulp = require('gulp');
let zip = require('gulp-zip');
let prompt = require('gulp-prompt');
let rename = require('gulp-rename');

// gulp.task('marketplace-release', ['build', 'dev-release'], function () {
//   return gulp.src('')
//     .pipe(prompt.prompt({
//       type: 'input',
//       name: 'version',
//       message: 'Please enter release version (x.x.x)'
//     }, function (res) {
//       var nameAndVersion = 'blur-admin-' + res.version;
//       return gulp
//         .src(['src/**', 'release/**', 'dev-release/**', 'gulp/**', 'bower.json', 'gulpfile.js', 'package.json', 'README.md', '.gitignore'], {base: "."})
//         .pipe(rename(function (path) {
//           path.dirname = nameAndVersion + '/' + path.dirname;
//         }))
//         .pipe(zip(nameAndVersion + '.zip'))
//         .pipe(gulp.dest('.'));
//     }));
//
// });