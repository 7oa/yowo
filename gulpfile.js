var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require("gulp-sass");
var dest_path = 'lp';

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('inline-css', ['sass'], function () {
  return gulp.src('src/*.html')
    .pipe($.inlineCss({
		preserveMediaQueries: true
	}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-images', function () {
  return gulp.src('dist/img', {read: false})
    .pipe($.clean());
});

gulp.task('images', ['clean-images'], function () {
  return gulp.src('src/img/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('scss', function() {
    gulp.src('lp/style.scss')
        .pipe( sass().on( 'error', function( error )
            {
                console.log( error );
            } )
        )
        .pipe(sass({
            // sourceComments: 'map'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( dest_path ));
});

// http://www.mailgun.com/
var emailOptions = {
  user: 'api:key-',
  url: '',
  form: {
    from: '',
    to: '',
    subject: 'The last dist'
  }
};

gulp.task('send-email', function () {
  return gulp.src('dist/index.html')
    .pipe($.email(emailOptions));
});

gulp.task('watch', function () {
  gulp.watch(['src/sass/**/*.sass', 'src/**/*.html'], ['inline-css']);
  gulp.watch('src/img/*', ['images']);
});

gulp.task('build', ['inline-css', 'images']);
gulp.task('test', ['send-email']);
gulp.task('default', ['watch']);
gulp.task('default2', ['scss']);
