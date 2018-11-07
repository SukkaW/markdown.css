var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var csslint = require('gulp-csslint');
var rename = require('gulp-rename');
var header = require('gulp-header');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

var paths = {
    source: './src/*.css'
};

var pkg = require('./package.json');

var banner = [
    '/*!',
    ' * markdown.css v<%= pkg.version %>',
    ' * Author <%= pkg.author %>',
    ' * Link <%= pkg.homepage %>',
    ' * License <%= pkg.license %>',
    ' */'].join('\n');

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
    gulp.watch(paths.source, gulp.parallel('build'));
});

gulp.task('build', () => {
    return gulp.src(paths.source)
        .pipe(header(banner, { pkg: pkg }))
        .pipe(autoprefixer(configs.autoprefixer))
        .pipe(csscomb())
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(gulp.dest('./dist'))
        .pipe(cleancss(configs.cleanCSS))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.parallel('build'));