const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync')

function sassTask() {
   return src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(dest('./dist/css'))
}
function jsTask() {
   return src('./src/script/**/*.js')
      .pipe(dest('./dist/script'))
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