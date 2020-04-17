var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browse = require('browser-sync').create(),
    autopref = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');
function scssToCss(done) {
       return  gulp.src('./app/scss/style.scss')
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
            .pipe( gulp.dest('./app/css/'))
            .pipe(browse.stream());
    done();
}



function browserSync(done){
    browse.init({
        server:{
            baseDir:"./app"
        }
    });
    done();
}
function browserReboot(done){
    browse.reload({streem:true});
    done();

}
function watchAll(){
    gulp.watch("./app/scss/*", scssToCss);
    gulp.watch("./app/*.html", browserReboot);
    gulp.watch("./app/js/*", browserReboot);
}
gulp.task('default',gulp.parallel(browserSync,watchAll));
