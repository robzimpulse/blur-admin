'use strict';

let gulp = require('gulp');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
require('./gulp/images');
require('./gulp/styles');
require('./gulp/scripts');
require('./gulp/inject');
require('./gulp/build');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
// gulp.task('default', ['clean'], function () {
//   gulp.start('build');
// });

gulp.task('default', gulp.series(['clean', 'build']));