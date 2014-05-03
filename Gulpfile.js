var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
	return gulp.src('lib/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('dist', function() {
	return gulp.src('lib/contact-form.js')
		.pipe(gulp.dest('dist'))
		.pipe(rename('contact-form.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'dist']);
