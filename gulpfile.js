// VAR
var 	autoprefixer	= require('autoprefixer'),
		browserSync		= require('browser-sync'),
		cssnano			= require('cssnano'),
		gulp			= require('gulp'),
		gutil			= require('gulp-util'),
		sass			= require('gulp-sass'),
		sourcemaps		= require('gulp-sourcemaps'),
		postcss			= require('gulp-postcss'),
		wait			= require('gulp-wait'),
		rename			= require('gulp-rename'),
		ftp				= require('vinyl-ftp'),
		minimist		= require('minimist');

var args = minimist(process.argv.slice(2));


// =============================================================================
// Errors Handler
// =============================================================================

var err = {
	errorHandler: function (error) {
		gutil.log('Error: ' + error.message);
		gutil.beep();
		this.emit('end');
	}
}

// =============================================================================
// SASS to CSS
// =============================================================================

gulp.task('sass', function() {
	gulp.src('sass/**/*.scss')
		.pipe( wait(100) )
		.pipe( sass() )
		.pipe( gulp.dest('css/') );
});

// =============================================================================
// CSS Enhancement
// =============================================================================

gulp.task('css', function () {
	var plugins = [
		//precss(),
		autoprefixer({browsers: ['last 2 version']}),
		cssnano()
	];

	return gulp.src('css/style.css')
		.pipe( sourcemaps.init() )
		.pipe( postcss(plugins) )
		.pipe( rename({suffix: '.min', prefix : ''}) )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest('css') )
		.pipe( browserSync.reload({stream: true}) );
});

// =============================================================================
// BrowserSync
// =============================================================================

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./"
		},
		notify: false
	});
});


// =============================================================================
// Deploy
// =============================================================================

gulp.task('deploy', function() {
    var remotePath = '/';
    var conn = ftp.create({
        host: 'gold.elastictech.org',
        user: args.user,
        password: args.password,
        log: gutil.log
    });
    gulp.src([
        './**/*.*',
        '!./.*',
        '!./node_modules/**/*.*'
    ])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});

// =============================================================================
// Watcher
// =============================================================================

gulp.task('watch', ['sass', 'css', 'browser-sync'], function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('css/style.css', ['css']);
	gulp.watch('js/*.js', browserSync.reload);
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('*.html', browserSync.reload);
});

gulp.task('build', ['sass', 'css']);

gulp.task('default', ['watch']);
