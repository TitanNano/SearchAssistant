/* eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const compiler = require('@af-modules/compiler');

const jsCompiler = compiler({
    cacheDir: '.caches',
    outDir: 'dist',
    extensions: ['.js'],
});

gulp.task('transform:sass', () => {
    return gulp.src(['src/styles/main.scss'])
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('transform:html', () => {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy:images', () => {
    return gulp.src(['src/images/**'])
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('copy:data', () => {
    return gulp.src(['src/data/**'])
        .pipe(gulp.dest('dist/data/'));
});

gulp.task('compile:js', () => {
    return gulp.src('src/code/bootstrap.js')
        .pipe(jsCompiler({
            module: 'app',
            context: 'src/code/',
        }));
});

gulp.task('copy', ['copy:images', 'copy:data']);
gulp.task('transform', ['transform:html', 'transform:sass']);

gulp.task('default', ['transform:sass', 'transform', 'copy', 'compile:js']);
