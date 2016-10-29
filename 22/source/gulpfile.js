var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var wrap = require('gulp-wrap');

gulp.task('build',function () {
	gulp.src('pages/*.html')
		.pipe(wrap({src:'layout/default.html'}))
		.pipe(gulp.dest('..'))
})

gulp.task('browser-sync',['sass','build','cp'], function() {
    browserSync({
        server: {
            baseDir: '..'
        }
    });
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
  gulp.src('styles/*.scss')
      .pipe(sass()).on('error', handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles'))
      .pipe(browserSync.reload({stream:true}));;
});

gulp.task('cp',function () {
	gulp.src('images/*')
		.pipe(gulp.dest('../images'));
})

gulp.task('rebuild',['build'],function () {
	browserSync.reload();
})

gulp.task('watch',function () {
	gulp.watch(['*/*.html'],['rebuild']);
	gulp.watch(['styles/*.scss'],['sass'])
})

gulp.task('default',['browser-sync','watch']);
