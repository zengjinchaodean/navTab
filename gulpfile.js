// 定义依赖和插件
var gulp = require('gulp'),
gulpLoadPlugins = require('gulp-load-plugins'),
plugins = gulpLoadPlugins();

var $ = require('gulp-load-plugins')();
// 路径变量
var htmlSrc = 'src/*.html',
jsSrc = 'src/js/*.js',
es6Src = 'src/es6/*.js',
ejsSrc = 'src/ejs/*.ejs',
sassSrc = 'src/sass/*.scss';


gulp.task('copy', function () {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css/'))
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    gulp.src('src/img')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('es6', function () {
    return gulp.src(es6Src)
    .pipe($.plumber())
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('src/js'))
    .pipe(plugins.connect.reload());
});

gulp.task('ejs', function () {
    gulp.src(ejsSrc)
    .pipe(plugins.ejs({}).on('error', plugins.util.log))
    .pipe(plugins.rename({
        extname: '.html'
    }))
    .pipe(gulp.dest('src'))
})

gulp.task('sass', function () {
    gulp.src(sassSrc)
    .pipe(plugins.plumber({
        errorHandler: function (error) {
            this.emit('end');
        }
    })).pipe(plugins.sass())
    .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("src/css"))
})

gulp.task('bak', function () {
    gulp.src(['src/**/*', '!src/lib', '!src/es6', '!src/sass'])
    .pipe(gulp.dest('bak/src'))
    gulp.src('dist/**/*')
    .pipe(gulp.dest('bak/dist'))
})

gulp.task('clean', ['bak'], function () {
    gulp.src(['src/*.html', 'src/css/*.css', 'src/js/*.js', '!src/lib', '!src/es6', '!src/sass'], {read: false})
    .pipe(plugins.clean())
})

gulp.task('reload', function () {
    gulp.src('src/**/*')
    .pipe(plugins.connect.reload())
})

// 定义livereload任务
gulp.task('connect', function () {
    return plugins.connect.server({
        root: 'src',
        livereload: true
    });
});

// 合并任务concat
gulp.task('concat', function () {
    return gulp.src(jsSrc)
    .pipe(plugins.concat('main.js'))
})


// 定义看守任务
gulp.task('watch', function () {
    gulp.watch('src/**/*', ['reload']);
    gulp.watch(ejsSrc,['ejs'])
    gulp.watch(es6Src, ['es6']);
    gulp.watch(sassSrc, ['sass']);
});


// 定义默认任务,控制台运行gulp就会默认执行这些任务
gulp.task('default', ['watch', 'connect']);