var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var ghPages = require('gulp-gh-pages');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('public/images'))
})

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['sass', 'images'], function() {
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass']);
});
