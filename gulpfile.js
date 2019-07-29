var gulp = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect');
var open = require('open');
var handleErrors = require('./gulp/until/handleError');
var babel = require("gulp-babel");  
var proxy = require('http-proxy-middleware');

gulp.task('html',function(){
    gulp.src('./src/html/**/*.html')
    .pipe(connect.reload())
})
gulp.task('css',function(){
    gulp.src('./src/css/*.css')
    .pipe(connect.reload())
})
//scss 编译
gulp.task('sass',function(){
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(gulp.dest('./src/css'))
        .pipe(connect.reload())
})
//babel 转义
gulp.task('bbTo',function(){
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'));
})
gulp.task('watch',function(){
    gulp.watch('./src/html/**/*.html',['html'])
    gulp.watch('./src/scss/*.scss',['sass'])
    
})
// gulp.task('sassErr', function(){
//     return gulp.src(config.src)        //less源文件
//         .pipe(less(config.settings))   //执行编译
//         .on('error', handleErrors)     //交给notify处理错误
//         .pipe(gulp.dest(config.dest))  //输出目录
// });
gulp.task('connect',function(){
    connect.server({
        root: './',
        livereload: true,
        port: 8080,
        middleware: function (connect, opt) {
            return [
                proxy('/api', {
                    target: 'http://peiqi.vfing.com:80',
                    changeOrigin:true,
                    pathRewrite:{//路径重写规则 
                        '^/api':'/api'
                    }
                }),
            ]
        }
    })
    open('http://localhost:8080/src/html')
})
 gulp.task('default',['html','sass','watch','connect'])
