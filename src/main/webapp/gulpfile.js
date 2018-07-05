let gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    plumber = require( 'gulp-plumber' ),
    livereload = require('gulp-livereload');

let dirs = {
  scss: './src/assets/stylesheets/scss/',
  css: './src/assets/stylesheets/css/',
};

gulp.task('default', function() {
  // place code for your default task here
});
 
gulp.task('style', function () {
  return gulp.src(dirs.scss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dirs.css))
    .pipe(livereload());
    
});

gulp.task('sass:watch', function () {
  gulp.watch(dirs.scss + '**/*.scss', ['sass']);
});

gulp.task ('watch', function() {
  gulp.watch(dirs.scss + '/**/*.scss', ['style']);
});

gulp.task ('default', ['style','watch']);