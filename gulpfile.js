'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pump = require('pump')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const eslint = require('gulp-eslint')

gulp.task('sass', () => {
    let input = './src/assets/sass/homepage/style.sass'
    let output = './build/assets/css'
    let prefixOptions = {
        browsers: ['last 2 versions'],
        cascade: false
    }
    gulp.src(input).pipe(sass()).pipe(autoprefixer(prefixOptions)).pipe(gulp.dest(output))
})

gulp.task('sass:watch', () => {
    gulp.watch('./src/assets/sass/**/*.sass', ['sass'])
})

gulp.task('compress', cb => {
    pump([
        gulp.src('./src/js/**/*.js'), uglify(), gulp.dest('./build/assets/js')
    ], cb)
})

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('html', () => {
    gulp.src('./src/**/*.html').pipe(gulp.dest('./build'))
})

gulp.task('img', () => gulp.src('./src/assets/img/*').pipe(imagemin()).pipe(gulp.dest('./build/assets/img')))

gulp.task('default', [
    'sass',
    'sass:watch',
    'img',
    'lint',
    'compress',
    'html'
])
