'use strict';
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pump = require('pump')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const eslint = require('gulp-eslint')

gulp.task('sass', () => {
  let input = './src/assets/sass/homepage/style.sass'
  let output = './src/assets/css'
  let prefixOptions = {
      browsers: ['last 2 versions'],
      cascade: false
  }

   gulp.src(input)
    .pipe(sass())
    .pipe(autoprefixer(prefixOptions))
    .pipe(gulp.dest(output))
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
})

gulp.task('css', () => {
  gulp.src('./src/assets/css/**/style.css')
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./build/assets/css'))
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

// gulp.task('lint', () => {
//     return gulp.src(['**/*.js','!node_modules/**'])
//         // eslint() attaches the lint output to the "eslint" property
//         // of the file object so it can be used by other modules.
//         .pipe(eslint())
//         // eslint.format() outputs the lint results to the console.
//         // Alternatively use eslint.formatEach() (see Docs).
//         .pipe(eslint.format())
//         // To have the process exit with an error code (1) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(eslint.failAfterError());
// });

gulp.task('html', () => {
  gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./build'))
})

gulp.task('img', () =>
    gulp.src('./src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets/img'))
);

gulp.task('default',['sass', 'sass:watch', 'img', 'compress', 'html'])
