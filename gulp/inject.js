'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let $ = require('gulp-load-plugins')();

let wiredep = require('wiredep').stream;
let _ = require('lodash');

let browserSync = require('browser-sync');

// gulp.task('inject-reload', ['inject'], function() {
//   browserSync.reload();
// });

gulp.task('injectAuth', gulp.series('stylesAuth', function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/auth.css')],
        paths: [path.join(conf.paths.src, '/auth.html'), path.join(conf.paths.src, '/reg.html')]
        // paths: [path.join(conf.paths.src, '/auth.html'), path.join(conf.paths.src, '/reg.html'), path.join(conf.paths.src, '/app/pages/authSigIn/authSignIn.html'), path.join(conf.paths.src, '/app/pages/authSigIn/authSignUp.html')]
    })
}));

gulp.task('inject404', gulp.series('styles404', function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/404.css')],
        paths: path.join(conf.paths.src, '/404.html')
    })
}));

gulp.task('inject', gulp.series('scripts', 'styles', 'injectAuth', 'inject404', 'copyVendorImages', function () {
    let injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/main.css'),
        //path.join(conf.paths.tmp, '/serve/app/auth.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], {read: false});

    let injectScripts = gulp.src([
        path.join(conf.paths.src, '/assets/js/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.module.js'),
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
        path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
    ])
    /*.pipe($.angularFilesort())*/
        .on('error', conf.errorHandler('AngularFilesort'));

    let injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src(path.join(conf.paths.src, '/index.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
}));

let injectAlone = function (options) {
    let injectStyles = gulp.src(
        options.css, {read: false});

    let injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src(options.paths)
        .pipe($.inject(injectStyles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
};