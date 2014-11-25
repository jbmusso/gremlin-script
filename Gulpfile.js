'use strict';
var gulp = require('gulp');

var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var rename = require('gulp-rename');

gulp.task('build', function() {
  gulp.src('index.js')
      .pipe(browserify({
        debug: true,
        standalone: 'GremlinScript'
      }))
      .pipe(rename('gremlin-script.js'))
      .pipe(gulp.dest('./build'))
      .pipe(size({ showFiles: true }))
      // Minified version
      .pipe(uglify())
      .pipe(rename('gremlin-script.min.js'))
      .pipe(gulp.dest('./build'))
      .pipe(size({ showFiles: true }));
});

gulp.task('test', function() {
  gulp.src('test/**/*.js')
      .pipe(mocha({
        reporter: 'spec',
        bail: true,
        globals: {
          should: require('should')
        }
      }))
      .on('error', function(error) {
        console.error('\nError:', error.plugin);
        console.error(error.message);
      });
});


gulp.task('watch', function() {
  function onChange(event) {
    console.log('File', event.type +':', event.path);
  }

  gulp.watch('src/**/*', ['test']).on('change', onChange);
  gulp.watch('test/**/*', ['test']).on('change', onChange);
});

// Main tasks
gulp.task('default', ['dev']);

gulp.task('dev', ['test', 'watch']);
