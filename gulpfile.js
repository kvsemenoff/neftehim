
var css_our = new Array(
	'css/reset.css',
	'css/fonts.css',
	'css/style.css',
	'block/a/style.css',
	'block/box/style.css',
	'block/button/style.css',
	'block/button-more/style.css',
	'block/doc-item/style.css',
	'block/h1/style.css',
	'block/h2/style.css',
	'block/input/style.css',
	'block/news-item/style.css',
	'block/product-item/style.css',
	'block/search-box/style.css',
	'block/strong/style.css',
	'block/submit/style.css',
	'block/textarea/style.css',
	'css/style-db.css',	
	'css/style-dd.css',
	'css/style-de.css',
	'css/style-df.css',
	'css/style-dg.css'
);

var scss_our = new Array(
	'css/reset.scss',
	'css/fonts.scss',
	'css/style.scss',
	'block/a/style.scss',
	'block/box/style.scss',
	'block/button/style.scss',
	'block/button-more/style.scss',
	'block/doc-item/style.scss',
	'block/h1/style.scss',
	'block/h2/style.scss',
	'block/input/style.scss',
	'block/news-item/style.scss',
	'block/product-item/style.scss',
	'block/search-box/style.scss',
	'block/strong/style.scss',
	'block/submit/style.scss',
	'block/textarea/style.scss',
	'css/style-db.scss',	
	'css/style-dd.scss',
	'css/style-de.scss',
	'css/style-df.scss',
	'css/style-dg.scss'
);
var css_libs = new Array(
	'libs/bootstrap/bootstrap-grid-3.3.1.min.css',
	'libs/fancybox/jquery.fancybox.css',
	'libs/owl.carousel/assets/owl.carousel.css'
);

var css_all = css_libs.concat(css_our); 

//Название общего фала для всех стилей
var css_style_name = 'style.min.css';

//файлы js-скриптов
var js_our = new Array(
	'js/fonts.js',
	'js/common.js',
	'js/map.js',
	'block/a/script.js',
	'block/box/script.js',
	'block/button/script.js',
	'block/button-more/script.js',
	'block/doc-item/script.js',
	'block/h1/script.js',
	'block/h2/script.js',
	'block/input/script.js',
	'block/news-item/script.js',
	'block/product-item/script.js',
	'block/search-box/script.js',
	'block/strong/script.js',
	'block/submit/script.js',
	'block/textarea/script.js'
);
var js_libs = new Array(
	'libs/jquery/jquery-1.11.1.min.js',
	'libs/owl.carousel/owl.carousel.js',
	'libs/fancybox/jquery.fancybox.pack.js',
	'js/jquery.maskedinput.min.js'
);
var js_all = js_libs.concat(js_our);

//Название общего файла для всех js-скриптов
var js_scripts_name = 'scripts.min.js';
	
//Заугразка библиотек
var gulp = require('gulp'),
	del = require('del'),
	gutil = require('gulp-util');
	ftp = require('gulp-ftp'),
	zip = require('gulp-zip'),
	fs = require("fs"),
	gulpSequence = require('gulp-sequence'),
	sass         = require('gulp-sass'), 
	autoprefixer = require('gulp-autoprefixer');
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	minifyJS = require('gulp-minify'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	replace = require('gulp-replace'),
	fileinclude = require('gulp-file-include'),
	imagemin     = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();

//Компиляция SCSS в CSS
gulp.task('sass', function(){ 
	return gulp.src('product/temp/*.scss') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('product/temp')) 
});

//Удаление всех файлов в папке /product
gulp.task('cleanfolder', function () {
  return del([
    'product/**/*'
  ]);
});
//Удаление всех файлов в папке /temp
gulp.task('del_temp', function () {
  return del([
    'product/temp'
  ]);
});


//Объединение и минификация всех собственных 
// gulp.task('default', ['concatAllSCSS','concatAllCSS', 'concatOurSS', 'concatLibCSS', 'compressJSAll', 'compressJSLibs', 'compressJSOur', 'imagemin', 'imageMenu', 'includeFiles', 'fonts',  'htaccessFiles', 'rootFiles'], function() {
//    return del([
//     'product/**/*'
//   ]);
// });


gulp.task('default', gulpSequence('cleanfolder', 'concatAllSCSS', 'sass', 'concatAllCSS', 'concatOurSS', 'concatLibCSS', 'temp_to_css', 'del_temp', 'compressJSAll', 'compressJSLibs', 'compressJSOur', 'imagemin', 'imageMenu', 'includeFiles', 'fonts',  'htaccessFiles', 'rootFiles', 'styles_to_minify','scripts_to_minify', 'zip', 'ftp'));

//Объединяем все наши scss в один и переносим в папку /temp для обработки
gulp.task('concatAllSCSS', function() {
  return gulp.src(scss_our)
    .pipe(concat('style.scss')) 
   .pipe(gulp.dest('product/temp/'))
});

//Объединение и минификация всех стилей подключаемых библиотек и общих стилей
gulp.task('concatAllCSS', function() {
  return gulp.src(css_all)
    .pipe(concat(css_style_name)) 
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('product/temp/'))
});

gulp.task('concatOurSS', function() {
  return gulp.src(css_our)
    .pipe(concat('style.css')) 
    .pipe(gulp.dest('product/temp/'))
});
gulp.task('concatLibCSS', function() {
  return gulp.src(css_libs)
    .pipe(concat('libs.min.css')) 
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('product/temp/'))
});


//Объединение и сжатие всех js-скриптов
gulp.task('compressJSAll', function(){
    return gulp.src(js_all)
        .pipe(concat(js_scripts_name))
        .pipe(uglify())
        .pipe(gulp.dest('product/js/'));
});
gulp.task('compressJSLibs', function(){
    return gulp.src(js_libs)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('product/js/'));
});
gulp.task('compressJSOur', function(){
    return gulp.src(js_our)
        .pipe(concat('common.js'))
        .pipe(gulp.dest('product/js/'));
});


//Оптимизаця картинок
gulp.task('imagemin', function() {
    return gulp.src('img/**.*')
           .pipe(imagemin({
                progressive: true
           }))
           .pipe(gulp.dest('product/img/'))
});

gulp.task('imageMenu', function() {
    return gulp.src('img/menu/**.*')
           .pipe(imagemin({
                progressive: true
           }))
           .pipe(gulp.dest('product/img/menu/'))
});

//Перенос всех файлов папки include, если это нужно
gulp.task('includeFiles', function() {
	return gulp.src('includes/**.*')
		
		.pipe(gulp.dest('product/includes')); 
});

//Перенос всех шрифтов
gulp.task('fonts', function() {
	return gulp.src('fonts/*/**.*')
		
		.pipe(gulp.dest('product/fonts')); 
});
//Перенос папки /temp в css
gulp.task('temp_to_css', function() {
	return gulp.src('product/temp/*.*')
		.pipe(gulp.dest('product/css')); 
});

//Перенос файлов в корне
gulp.task('rootFiles', function() {
	return gulp.src(['*.html','*.php'])
		
		.pipe(gulp.dest('product/')); 
});
//Перенос .htaccess
gulp.task('htaccessFiles', function() {
	return gulp.src('.htaccess')
		
		.pipe(gulp.dest('product/')); 
});

//Перенос всех файлов scss в папку /product для дальнейшей обработки
gulp.task('scss_to_templ', function() {
	return gulp.src(scss_our)
		
		.pipe(gulp.dest('product/temp')); 
});
  
gulp.task('fileinclude', function() {
  gulp.src('*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
}))
    .pipe(gulp.dest(''));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });
});
// Замена скриптов на минифицированный из файла

gulp.task('scripts_to_minify', function(){
	var fileContent = fs.readFileSync("product/js/scripts.min.js", "utf8");

  gulp.src('product/includes/footer.php')

    .pipe(replace(new RegExp('<!-- scripts start -->(.|[\r|\n])*?<!-- scripts end -->', 'g'), function() { return '<script>\r\n'+fileContent+'\r\n</script>' } ))
    .pipe(gulp.dest('product/includes/'));
});

gulp.task('styles_to_minify', function(){
	var fileContent = fs.readFileSync("product/css/style.min.css", "utf8");

  gulp.src('product/includes/header.php')

    .pipe(replace(new RegExp('<!-- styles start -->(.|[\r|\n])*?<!-- styles end -->', 'gm'), function() { return '<style>\r\n'+fileContent+'\r\n</style>' } ))
    .pipe(gulp.dest('product/includes/'));
});

gulp.task('watch', ['browser-sync','sass', 'fileinclude'], function() {
	gulp.watch('css/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('includes/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта

	gulp.watch('js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('zip', () =>
    gulp.src(['product/*/**.*', 'product/*'])
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('product/'))
);

gulp.task('ftp', function () {
    return gulp.src('product/archive.zip')
        .pipe(ftp({
            host: '77.222.57.247',
            user: 'kvsemen156',
            pass: '7P6cjQNMR',
            remotePath: '/public_html/'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed 
        // this can be a gulp plugin, gulp.dest, or any kind of stream 
        // here we use a passthrough stream 
        .pipe(gutil.noop());
});
