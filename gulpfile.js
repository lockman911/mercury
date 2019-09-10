var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var browsersync = require('browser-sync')

function css_sass(cb){
    gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole:true,
        outputStyle: 'compressed'
    }))
    .on(Error, console.error.bind(console))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('public_html/'))
    .pipe(browsersync.stream());

    cb();

}

function sync(done){
    browsersync.init({
        server:'./public_html',
        port:4000
    })
    done();
}
function reloard(done){
    browsersync.reload();
    done();
}

function Watch(){
    gulp.watch('src/sass/**/*', css_sass);
    gulp.watch('public_html/**/*.html', reloard);
}
gulp.task('default', gulp.parallel(sync,Watch));