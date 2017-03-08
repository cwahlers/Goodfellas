'use strict';
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pump = require('pump')
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');


gulp.task('sass', () => {
  let input = './src/assets/sass/style.sass'
  let output = './build/assets/css'
  return gulp.src(input)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(output))
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
})


gulp.task('compress', cb => {
  pump([
      gulp.src('./src/js/**/*.js'),
      uglify(),
      gulp.dest('./build/assets/js')
    ],
    cb
  )
})

gulp.task('img', () =>
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
);

gulp.task('default',['sass', 'sass:watch', 'img', 'compress'])
