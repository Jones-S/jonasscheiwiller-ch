// load node modules/plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
// var browsersync = require('browser-sync');


// Error Helper
function onError(err) {
    notify({ message: 'Oh Boy. Error.' });
    console.log("ERROR:    ------     " + err);
}

// sass compiling task
gulp.task('sass', function() {
    gulp.src('scss/main.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Sass task completed' }));
});



// concat gulp task
gulp.task('concat', function() {
    return gulp.src('js/*.js')
        .pipe(plumber({
                errorHandler: onError
            }))
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('js/dist'))
        .pipe(notify({ message: 'Concatenate task completed' }));
});


// watch task
gulp.task('watch', function() {
    // watch scss files
    gulp.watch('scss/*.scss', ['sass']);

    // Watch .js files
    gulp.watch('js/*.js', ['concat']);
});


// Default task
gulp.task('default', ['watch']);