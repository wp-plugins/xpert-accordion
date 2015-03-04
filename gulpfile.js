//__package require__//

var gulp = require('gulp'),
    less = require('gulp-less');
livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

//__less file compile__//
gulp.task('compile', function(){
    gulp.src('assets/less/**/*.less')
        .pipe(plumber())
        .pipe( less())
        .pipe( gulp.dest('assets/css'))
        .pipe(livereload());
});


//__minify css file__//
gulp.task('minifycss', function(){

    gulp.src(['assets/css/**/*.css', '!assets/css/**/*.min.css'])
        //minify files
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())

        //output
        .pipe(gulp.dest('assets/css'))

});


//__minify js file__
gulp.task('minifyjs', function(){

    gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe( gulp.dest('assets/js'))

});


//Watch Task
gulp.task('watch',function(){

    gulp.watch('assets/less/*.less',['compile']);
    //livereload.listen();
});

gulp.task('default',['watch','minifyjs','minifycss']);