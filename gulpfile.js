const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync')
const cssnano = require('gulp-cssnano')
const terser = require('gulp-terser')
const postcss = require('gulp-postcss')

function sassTask() {
   return src('./src/sass/**/*.scss', { sourcemaps: true })
      .pipe(sass())
      .pipe(postcss())
      .pipe(cssnano())
      .pipe(dest('./dist/css', { sourcemaps: '.' }))
}
function jsTask() {
   return src('./src/script/**/*.js', { sourcemaps: true })
      .pipe(dest('./dist/script', { sourcemaps: '.' }))
}
function browserSyncStart(fn) {
   browserSync.init({
      server: {
         baseDir: './'
      }
   })
   fn()
}
function browserSyncReload(fn) {
   browserSync.reload()
   fn()
}
function watchTask() {
   watch('index.html', browserSyncReload)
   watch(['./src/sass/**/*.scss', './src/script/**/*.js'],
      series(sassTask, jsTask, browserSyncReload))
}

exports.default = series(
   sassTask,
   jsTask,
   browserSyncStart,
   watchTask
)