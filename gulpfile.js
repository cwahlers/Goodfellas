'use strict';
var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', () => {
  var input = './src/assets/sass/style.sass'
  var output = './build/assets/css/'
  return gulp.src(input)
    .pipe(sass())
    .pipe(gulp.dest(output))
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
});

gulp.task('default',['sass', 'sass:watch'])
