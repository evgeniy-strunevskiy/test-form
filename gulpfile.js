const {src, dest, watch, parallel, series} = require('gulp')

const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean')

function scripts() {
  return src('app/js/main.js')
    .pipe(autoprefixer({overrideBrowserList: ['Last 10 version']}))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/styles.scss')
  .pipe(concat('styles.min.css'))
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function watching() {
  watch(['app/scss/styles.scss'], styles)
  watch(['app/js/main.js'], styles)
  watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync() {
  browserSync.init({
    server: {
        baseDir: "app/"
    }
});
}

function cleanDist() {
  return src('dist')
  .pipe(clean())
}

function building() {
  return src([
    'app/css/styles.min.css',
    'app/js/main.min.js',
    'app/index.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, browsersync, watching)