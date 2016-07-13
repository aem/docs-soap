const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');
require('babelify');

gulp.task('default', () => {
  const appBundler = browserify({
    entries: './src/index.js',
    debug: true,
    standalone: 'docs-soap'
  });

  appBundler
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(streamify(uglify()))
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('./dist'));
});
