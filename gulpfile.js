var gulp = require('gulp');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var rutas = {
  rutaHTML : 'src/index.html',
  rutaJS : 'src/assets/js/*.js',
  rutaSCSS : 'src/assets/scss/main.scss'
};

//copia el index de la carpeta src a la carpeta public
gulp.task('html',function(){
  gulp.src(rutas.rutaHTML)
  .pipe(gulp.dest('public'))
});

//uglify = minifica el archivo js
//obfuscate = cambia el nombre de las variables
//gulp.dest = el archivo minificado y con variables renombradas lo guarda en la direccion indicada
gulp.task('prepararJS',function(){
  gulp.src(rutas.rutaJS)
  .pipe(uglify())
  .pipe(obfuscate())
  .pipe(gulp.dest('public/assets/js'))
});

//ejecuta sass para crear el archivo css
gulp.task('prepararCSS', function(){
  gulp.src(rutas.rutaSCSS)
  .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
  .pipe(gulp.dest('public/assets/css'))
});

//ver los cambios en el css cuando se guarde un nuevo cambio en scss
/*gulp.task('verCambiosCss',function(){
  gulp.watch(rutas.rutaSCSS,['prepararCSS'])
});*/

//watch = ver los cambios realizados en el momento en que se guardan cambios nuevos
gulp.task('html-watch',['html'], function(done){
  browserSync.reload();
  done();
})

gulp.task('sass-watch', ['prepararCSS'],function(){
  browserSync.reload();
})

gulp.task('js-watch',['prepararJS'], function(){
  browserSync.reload();
})

//ejecutar todos los watch con una sola instrucción
gulp.task('cambios', function(){
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  gulp.watch(rutas.rutaHTML, ['html-watch'])
  gulp.watch(rutas.rutaSCSS, ['sass-watch'])
  gulp.watch(rutas.rutaJS, ['js-watch'])
});
