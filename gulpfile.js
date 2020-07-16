var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

function serve() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch("./**/*.scss", style);
    gulp.watch("app/index.html", index);
    gulp.watch("./**/*.svg", svg);
    gulp.watch("app/*.html").on('change', browserSync.reload);
}

exports.serve = serve;

function style() {
    return gulp.src('./**/*.scss')
        .pipe(sass().on('error', function(err) {
            console.error(err.message);
            browserSync.notify(err.message, 3000);
            this.emit('end');
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}
exports.style = style;


function svg() {
    return gulp.src("./**/**/*.svg")
        .pipe(gulp.dest("dist/svg"))
        .pipe(browserSync.stream());
}
exports.svg = svg;

function index() {
    return gulp.src("app/index.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

exports.index = index;

exports.default = serve;