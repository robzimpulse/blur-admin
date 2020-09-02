'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let browserSync = require('browser-sync');

let $ = require('gulp-load-plugins')();

let wiredep = require('wiredep').stream;
let _ = require('lodash');

gulp.task('styles', function () {
    return buildStyles();
});

gulp.task('stylesAuth', function () {
    return buildSingleScss(path.join(conf.paths.src, '/sass/auth.scss'));
});
gulp.task('styles404', function () {
    return buildSingleScss(path.join(conf.paths.src, '/sass/404.scss'));
});

let buildStyles = function () {
    let sassOptions = {
        style: 'expanded'
    };

    let injectFiles = gulp.src([
        path.join(conf.paths.src, '/sass/**/_*.scss'),
        '!' + path.join(conf.paths.src, '/sass/theme/conf/**/*.scss'),
        '!' + path.join(conf.paths.src, '/sass/404.scss'),
        '!' + path.join(conf.paths.src, '/sass/auth.scss')
    ], {read: false});

    let injectOptions = {
        transform: function (filePath) {
            filePath = filePath.replace(conf.paths.src + '/sass/', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    return gulp.src([
        path.join(conf.paths.src, '/sass/main.scss')
    ])
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

let buildSingleScss = function (paths) {
    let sassOptions = {
        style: 'expanded'
    };

    return gulp.src([paths])
        .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

gulp.task('styles-reload', gulp.series('styles', function () {
    return buildStyles()
        .pipe(browserSync.stream());
}));