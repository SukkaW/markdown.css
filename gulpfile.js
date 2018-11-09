let gulp = require('gulp');
let cleancss = require('gulp-clean-css');
let csscomb = require('gulp-csscomb');
let csslint = require('gulp-csslint');
let rename = require('gulp-rename');
let header = require('gulp-header');
let autoprefixer = require('gulp-autoprefixer');
let del = require('del');

var paths = {
    source: './src/*.css'
};

let pkg = require('./package.json');

var banner = [
    '/*!',
    ' * markdown.css v<%= pkg.version %>',
    ' * Author <%= pkg.author %>',
    ' * Link <%= pkg.homepage %>',
    ' * License <%= pkg.license %>',
    ' */',
    ''].join('\n');

var configs = {
    autoprefixer: {
        browsers: [
            'last 2 versions',
            '> 1%',
            'Chrome >= 30',
            'Firefox >= 30',
            'ie >= 9',
            'Safari >= 8',
        ],
    },
    cleanCSS: {
        compatibility: 'ie9'
    },
};

gulp.task('watch', function () {
    gulp.watch(paths.source, gulp.parallel('clean', 'build'));
});

gulp.task('build', () => {
    return gulp.src(paths.source)
        .pipe(header(banner, { pkg: pkg }))
        .pipe(autoprefixer(configs.autoprefixer))
        .pipe(csscomb())
        .pipe(csslint.formatter())
        .pipe(csslint())
        .pipe(gulp.dest('./dist'))
        .pipe(cleancss(configs.cleanCSS))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', () => {
    return del([
        'dist/**/*',
    ]);
})

gulp.task('default', gulp.parallel('clean', 'build'));