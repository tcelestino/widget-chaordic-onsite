'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodeNormalize from 'node-normalize-scss';
import browserSync from 'browser-sync';

// path from sources
const SRC = {
  scss: __dirname + '/src/scss/**/*.scss',
  images: __dirname + '/src/images/*.{jpg,png,gif}'
};

// path form dist
const DIST = {
  css: __dirname + '/www/assets/css/',
  js: __dirname + '/www/assets/js/',
  images: __dirname + '/www/assets/images/'
};

let $ = gulpLoadPlugins();
let server = browserSync.create();

gulp.task('server', ['sass', 'js'], () => {
    server.init({
        server: "./www"
    });

    gulp.watch(SRC.scss, ['sass']);
    gulp.watch(SRC.js, ['js']);
    gulp.watch("www/*.html").on('change', server.reload);
});

gulp.task('sass', () => {
  let normalize = nodeNormalize.includePaths;
  return gulp.src(SRC.scss)
    .pipe($.sass(
      {
        includePaths: normalize
      }
  ).on('error', $.sass.logError))
    .pipe(gulp.dest(DIST.css))
    .pipe(server.stream());
});

gulp.task('js', () => {
  return gulp.src(
    [
      'src/components/lodash/lodash.js',
      'src/js/carousel.js',
      'src/js/app.js'
    ])
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(DIST.js))
    .pipe(server.stream());
});

gulp.task('images', () => {
  return gulp.src(SRC.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(DIST.images));
});

gulp.task('default', ['server', 'images']);
gulp.task('prod', () => console.log('Produção'));
