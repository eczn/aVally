var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); 

gulp.task('connect', function(){
	connect.server({
		root: './src',
		port: 8080,
		livereload: true
	});
});

var appList = ['app', 'router'];

gulp.task('bundle', function(){
	return gulp.src(mapFiles(appList, 'js'))
				.pipe(named())
				.pipe(webpack({
					module: {
						loaders: [{
							test: /\.vue$/,
							loader: 'vue'
						}, {
							test: /\.(png|jpg)$/,
							loader: 'url'
						}]
					},
					watch: true
				}))
				// .pipe(uglify())
        		.pipe(gulp.dest('src/lib/'))
				.pipe(connect.reload());
});

gulp.task('uglify', function() {
	var temp = gulp.src(['src/lib/js/fastclick.js', 'src/lib/js/appConfig.js', 'src/lib/js/markVally.js'])
		.pipe(named('fastclick.min.js'))
		.pipe(uglify())
		.pipe( concat('libs.min.js') )
		.pipe(gulp.dest('src/lib/js/mins'))
		.pipe(connect.reload());; 

    return temp; 
});

function mapFiles(list, extname) {
	return list.map(function (app){
		return 'src/' + app + '.' + extname;
	});
};


// gulp.task('default', ['bundle', 'connect', 'uglify']);
gulp.task('default', ['bundle', 'connect']);
