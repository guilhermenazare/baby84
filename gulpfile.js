// Modules
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    bs = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    bower = require('gulp-bower');
 
//Diretorios

var dirs = {
    //src
    Html:'./app/**/*.html',
    Css: './app/**/*.scss',
    Js: './app/**/*.js',
    Img:'./app/assets/img/*',
    Libs:'./app/libs/',
    Download:'./app/download/**/*',
    
    //dest
    build:{
        Html:'./build/app/',
        Css:'./build/app/',
        Js: './build/app/',
        Img:'./build/app/assets/img',
        Libs:'./build/app/libs/',
        Download:'./build/app/download/'
    }
};

// Tasks

gulp.task('teste',function(){
    // gulp.src(['app/**/*.scss','!app/libs/**/*.scss'],function (er, files) {
    //     console.log('Arquivos:',files);
    // });
});

gulp.task('sass', function(){
    gulp.src(dirs.Css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['> 1%', 'ie 9'],
            cascade: false
        }))
    .pipe(gulp.dest(dirs.build.Css));
});

gulp.task('js', function(){
    gulp.src(dirs.Js)
    .pipe(gulp.dest(dirs.build.Js));
});

gulp.task('html',function(){
    gulp.src(dirs.Html)
    .pipe(gulp.dest(dirs.build.Html));
});

gulp.task('libs',function(){
    gulp.src(dirs.Libs)
    .pipe(gulp.dest(dirs.build.Libs));
});

gulp.task('download',function(){
    gulp.src(dirs.Download)
    .pipe(gulp.dest(dirs.build.Download));
});

// gulp.task('components',function(){
//     gulp.src(dirs.Components,{base: './app/components'})
//     .pipe(gulp.dest(dirs.build.Components));
// });

gulp.task('img',function(){
    gulp.src(dirs.Img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dirs.build.Img));
});

gulp.task('watch', function(){
    gulp.watch([dirs.Css,dirs.Js,dirs.Html], ['sass','js','html','libs']).on('change', function(event) {
      console.log('\r\r >>> O arquivo ' + '\x1b[33m%s\x1b[0m',event.path + '\x1b[37m\x1b[0m'+' foi modificado.\r >>> Reexecutando as Tarefas, aguarde...\r\r');
      bs.reload();
    });
});

gulp.task('serve',['html','libs','sass','js','img','watch','download'], function() {
    bs.init({
        port: 8081,        
        server: {
            baseDir: dirs.build.Html,
        }
    });
    return bower({ cmd: 'install'});
});