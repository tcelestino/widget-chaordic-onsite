'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var nodeNormalize = require('node-normalize-scss');
var browserSync = require('browser-sync');
var rimraf = require('rimraf');

// path from sources
var SRC = {
  scss: __dirname + '/src/scss/**/*.scss',
  css: __dirname + '/src/css/*.css',
  js: [
    'src/components/lodash/lodash.js',
    'src/components/handlebars/handlebars.js',
    'src/js/helpers.js',
    'src/js/carousel.js',
    'src/js/app.js'
  ],
  images: __dirname + '/src/images/*.{jpg,png,gif}'
};

// path form dist
var DIST = {
  css: __dirname + '/www/assets/css/',
  js: __dirname + '/www/assets/js/',
  images: __dirname + '/www/assets/images/'
};

var $ = gulpLoadPlugins();
var server = browserSync.create();
var serverConfig = {
  server: "./www",
  port: 8080
};
var normalize = nodeNormalize.includePaths;

gulp.task('server', ['css:dev', 'js:dev'], function() {
    server.init(serverConfig);

    gulp.watch(SRC.scss, ['css:dev']);
    gulp.watch(SRC.js, ['js:dev']);
    gulp.watch("www/*.html").on('change', server.reload);
});

gulp.task('server_build', ['images', 'css', 'prefixer', 'js', 'clean'], function () {
  server.init(serverConfig);
});

gulp.task('images', function() {
  return gulp.src(SRC.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(DIST.images));
});

gulp.task('clean', function (cb) {
  rimraf('./src/css', cb);
});

// dev tasks
gulp.task('css:dev', function() {
  return gulp.src(SRC.scss)
    .pipe($.sass(
      {
        includePaths: normalize
      }
  ).on('error', $.sass.logError))
    .pipe(gulp.dest(DIST.css))
    .pipe(server.stream());
});

gulp.task('js:dev', function() {
  return gulp.src(SRC.js)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(DIST.js))
    .pipe(server.stream());
});

// prod tasks
gulp.task('css', function() {
  return gulp.src(SRC.scss)
    .pipe($.sass({
      includePaths: normalize,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('prefixer', function() {
  return gulp.src(SRC.css)
    .pipe($.autoprefixer(
      {
        browsers: ['last 2 versions'],
        cascade: false
      }
    ))
    .pipe(gulp.dest(DIST.css));
});

gulp.task('js', function() {
  return gulp.src(SRC.js)
    .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(DIST.js));
});

gulp.task('default', ['server', 'images']);
gulp.task('build', ['server_build']);
