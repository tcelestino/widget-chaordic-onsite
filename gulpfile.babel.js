'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodeNormalize from 'node-normalize-scss';
import browserSync from 'browser-sync';

// path from sources
const SRC = {
  scss: __dirname + '/src/scss/**/*.scss',
  css: __dirname + '/src/css/*.css',
  js: [
    'src/components/lodash/lodash.js',
    'src/js/carousel.js',
    'src/js/app.js'
  ],
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
let normalize = nodeNormalize.includePaths;

gulp.task('server', ['css:dev', 'js:dev'], () => {
    server.init({
        server: "./www"
    });

    gulp.watch(SRC.scss, ['css:dev']);
    gulp.watch(SRC.js, ['js:dev']);
    gulp.watch("www/*.html").on('change', server.reload);
});

gulp.task('images', () => {
  return gulp.src(SRC.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(DIST.images));
});

gulp.task('clean', function () {
  return gulp.src('src/css/', {read: false})
    .pipe($.clean());
});

// dev tasks
gulp.task('css:dev', () => {
  return gulp.src(SRC.scss)
    .pipe($.sass(
      {
        includePaths: normalize
      }
  ).on('error', $.sass.logError))
    .pipe(gulp.dest(DIST.css))
    .pipe(server.stream());
});

gulp.task('js:dev', () => {
  return gulp.src(SRC.js)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(DIST.js))
    .pipe(server.stream());
});

// prod tasks
gulp.task('css', () => {
  return gulp.src(SRC.scss)
    .pipe($.sass({
      includePaths: normalize,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('prefixer', () => {
  return gulp.src(SRC.css)
    .pipe($.autoprefixer(
      {
        browsers: ['last 2 versions'],
        cascade: false
      }
    ))
    .pipe(gulp.dest(DIST.css));
});

gulp.task('js', () => {
  return gulp.src(SRC.js)
    .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(DIST.js));
});

gulp.task('default', ['server', 'images']);
gulp.task('prod', ['images', 'css', 'prefixer', 'js', 'clean']);
