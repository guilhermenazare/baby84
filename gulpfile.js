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
    gulp = require('gulp');
    autoprefixer = require('gulp-autoprefixer');

//Diretorios

var dirs = {
    //src
    
    Html:['./app/**/*.html','.app/libs'],
    Css: ['./app/**/*.scss','!.app/lib'],
    Js: ['./app/assets/js/*.js','!.app/lib'],
    Img:'./app/assets/img/*',
    Libs:'./app/libs/**/*',
    Components:['./app/components/**/*.*'],
    Download:'./app/download/**/*',
    
    //dest
    build:{
        Html:'./build/app/',
        Css:'./build/app/',
        Js: './build/app/assets/js/',
        Img:'./build/app/assets/img',
        Libs:'./build/app/libs/',
        Components:'./build/app/components/',
        Download:'./build/app/download/'
    }
};

// Tasks
gulp.task('teste',function(){
    console.log("teste");
});

gulp.task('sass', function(){
    gulp.src(dirs.Css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
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

gulp.task('components',function(){
    gulp.src(dirs.Components,{base: './app/components'})
    .pipe(gulp.dest(dirs.build.Components));
});

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
    gulp.watch([dirs.Css,dirs.Js,dirs.Html,dirs.Components], ['sass','js','html','libs','components']).on('change', function(event) {
      console.log('\r\r >>> O arquivo ' + '\x1b[33m%s\x1b[0m',event.path + '\x1b[37m\x1b[0m'+' foi modificado.\r >>> Reexecutando as Tarefas, aguarde...\r\r');
      bs.reload();
    });
});

gulp.task('serve',['html','libs','sass','js','components','img','watch','download'], function() {
    bs.init({
        port: 8081,        
        server: {
            baseDir: dirs.build.Html,
        }
    });
});



