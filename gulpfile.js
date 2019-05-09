const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      sass  = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps');

const paths = {
	
    styles: {
        src: "src/scss/*.scss",
        cssadd: "src/scss/includes/*.scss",
        dst: "src/css",
        html: "src/*.html"
    }
	
};

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dst))
            .pipe(browserSync.stream())
	
    );
	
};
exports.style = style;

	
function reload() {
	console.log("reload html");
    browserSync.reload();
	
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.styles.cssadd, style);
    gulp.watch(paths.styles.html, reload);
};

try {
    fs.accessSync("src/css/style.css");
} catch(e) {
    style();
    console.log("css file not found, reloading...")
    reload();
}

exports.watch = watch;