var gulp = require('gulp')
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cleancss = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var plumberNotifier = require('gulp-plumber-notifier');
const cached = require('gulp-cached');




gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});



gulp.task('imgCopy', async function(){
  console.log('image copy scripts here')
  gulp.src('./app/img/*')
   .pipe(cached('image'))
   .pipe(plumberNotifier())
   .pipe( gulp.dest('./dist/img'))
})


gulp.task('jsBuild', async function(){
  gulp.src('./app/js/*.js')
   .pipe(cached('js'))
   .pipe(plumberNotifier())
   .pipe( gulp.dest('./dist/js'))
})



gulp.task('watcher', function(){
  gulp.watch('./app/js/*.js', gulp.series('jsBuild'))
  gulp.watch('./app/scss/*.sass', gulp.series('cssBuild'))
    gulp.watch(['./app/*.pug','./app/partials/*.pug'], gulp.series('htmlBuild'))
})



gulp.task('htmlBuild' ,async function(){
  gulp.src('./app/*.pug')
  .pipe(plumberNotifier())
  .pipe(pug({
    pretty: true
  }))
  .pipe( gulp.dest('./dist'))
})


gulp.task('cssBuild', async function(){
  gulp.src('./app/scss/*.sass')
  .pipe(plumberNotifier())
  .pipe( sass() )
  .pipe(cleancss({keepBreaks: true}))
  .pipe(autoprefixer({
    browsers: ['last 20 versions'],
    cascade: false
  }))
  .pipe( gulp.dest('./dist/css/') )

})



gulp.task('serve', gulp.parallel('watcher', 'webserver'))
gulp.task('default',async function(){
  console.log('Comon boys')
})