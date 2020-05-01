var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browse = require('browser-sync').create(),
    autopref = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');
function scssToCss() {
       return  gulp.src('./src/scss/style.scss')
            .pipe(sass({
                errorLogToConsole: true
            }))
            .pipe(autopref({
                overrideBrowserslist: ['last 15 versions', '> 1%','ie 11','ie 8', 'ie 7'],
                cascade: false
            }))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .on('error',console.error.bind(console))
            .pipe( gulp.dest('./dist/'))
            .pipe(browse.stream())

}

function babelator() {
    gulp.src('src/js/script.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browse.stream())
}

function browserSync(){
    browse.init({
        server:{
            baseDir:"./dist"
        }
    });
}
function browserReboot(){
    browse.reload({streem:true});
}
function sharingan(){
    gulp.watch("./src/scss/*", scssToCss);
    gulp.watch("./dist/*.html", browserReboot);
    gulp.watch("./src/js/*", babelator);
}
gulp.task('default',gulp.parallel(browserSync,sharingan));
