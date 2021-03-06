//"gulp-concat": "^2.6.0",   js合并
//    "gulp-minify-css": "^1.2.4",   css压缩
//    "gulp-uglify": "^1.5.3" js压缩

var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
jshint=require('gulp-jshint');
//语法检查
gulp.task('jshint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//压缩css
gulp.task('minifycss', function() {
    return gulp.src('src/css/*.css')    //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dest/css'));   //输出文件夹
});
//压缩 js  这里有问题
gulp.task('minifyjs',['miniconcat'], function() {
    return gulp.src('dest/js/main.js')      //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dest/js'))       //输出到文件夹
});

//合并 js 这里有问题
gulp.task('miniconcat', function() {
    return gulp.src('src/js/*.js')      //需要操作的文件
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dest/js'));  //输出
});

//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default',['jshint'],function() {
    gulp.start('minifycss','miniconcat','minifyjs');
});