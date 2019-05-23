const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


gulp.task('build', () => {
    return browserify('src/index.js', {'standalone': 'Shaman'})
        .transform(babelify, {presets: ['@babel/preset-env']})
        .bundle()
        .pipe(source('shaman.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
