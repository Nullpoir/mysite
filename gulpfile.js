const gulp = require('gulp')
const { src, dest } = require('gulp')
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');


gulp.task('build', () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(''))
});

gulp.task('watch', () => {
    gulp.watch('frontend/src', gulp.task('build'));
});

gulp.task('default', gulp.task('watch'));