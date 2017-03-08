'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pump = require('pump')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const eslint = require('gulp-eslint')

gulp.task('sass', () => {
    let home = './src/assets/sass/home/style.sass'
    let login = './src/assets/sass/login/login.sass'
    let portal = './src/assets/sass/portal/portal.sass'
    let register = './src/assets/sass/register/register.sass'

    let output = './build/assets/css'
    let prefixOptions = {
        browsers: ['last 2 versions'],
        cascade: false
    }

    gulp.src(home).pipe(sass().on('error', sass.logError)).pipe(autoprefixer(prefixOptions)).pipe(gulp.dest(output))
    gulp.src(login).pipe(sass().on('error', sass.logError)).pipe(autoprefixer(prefixOptions)).pipe(gulp.dest(output))
    gulp.src(portal).pipe(sass().on('error', sass.logError)).pipe(autoprefixer(prefixOptions)).pipe(gulp.dest(output))
    gulp.src(register).pipe(sass().on('error', sass.logError)).pipe(autoprefixer(prefixOptions)).pipe(gulp.dest(output))
})

gulp.task('sass:watch', () => {
    gulp.watch('./src/assets/sass/**/*.sass', ['sass'])
})

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('compress', cb => {
    pump([
        gulp.src('./src/**/*.js'), uglify(), gulp.dest('./build')
    ], cb)
})

gulp.task('img', () => gulp.src('./src/assets/img/*').pipe(imagemin()).pipe(gulp.dest('./build/assets/img')))

gulp.task('default', [
    'sass',
    'sass:watch',
    'img',
    'lint',
    'compress'])
