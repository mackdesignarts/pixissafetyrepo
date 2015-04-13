/*************************
Pixis | Safety Training App 

Gulpfile.js
==========================
Clientside build pipepline 

Gulp 3.8.11

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 3/11/15
*************************/

'use strict';

var gulp        = require('gulp'), 
    rjs         = require('gulp-requirejs'),
    concat      = require('gulp-concat'),
    concatCss   = require('gulp-concat-css'),
    rename      = require("gulp-rename"),
    gulpIgnore  = require('gulp-ignore'),
    uglify      = require('gulp-uglify');

/* Globals */

var ENV = {
    // dev env task registration
    dev    : [
        'concatVendorJS', 
        'concatBuildJS', 
        'copyImg', 
        'copyFonts',
        'copyHtml', 
        'copyIndex',
        'copyMinMap',
        'concatVendorCss', 
        'copyMainCss'
        ],     
    // dev env task registration
    test   : 'test',
    // dev env task registration
    prod   : 'prod'
};

/* Paths */

var _src = {
	root	: 'app/src/',
	styles	: 'app/assets/css/',
	images 	: 'app/assets/img/',
    fonts 	: 'app/assets/fonts/',
	scripts	: 'app/src/',
    vendor  : 'bower_components/'
}

var _dest = {
	root	: '../SafetyTraining.Web/Content/',
    index   : '../SafetyTraining.Web/Views/Home/',
	styles	: '../SafetyTraining.Web/Content/css/',
	images 	: '../SafetyTraining.Web/Content/img/',
    fonts 	: '../SafetyTraining.Web/Content/fonts/',
	scripts	: '../SafetyTraining.Web/Content/js/'
};

/* Task Config */

// Env get set
var setEnv = function (env){ return CONFIG.environment = env; };
var getEnv = function (){ return CONFIG.environment; };

// Concat files | js
gulp.task('concatVendorJS', function() {
  return gulp.src([
      _src.vendor + 'jquery/dist/jquery.js',
      _src.vendor + 'jquery-ui/jquery-ui.js',
      _src.vendor + 'bootstrap/dist/js/bootstrap.js',
      _src.vendor + 'moment/moment.js',
      _src.vendor + 'angular/angular.js',
      _src.vendor + 'angular-route/angular-route.js', 
      _src.vendor + 'angular-animate/angular-animate.js', 
      _src.vendor + 'angular-bootstrap/ui-bootstrap.js', 
      _src.vendor + 'angular-grid/build/ng-grid.js', 
      _src.vendor + 'angular-sanitize/angular-sanitize.js',
      _src.vendor + 'angular-ui-router/release/angular-ui-router.js',
      _src.vendor + 'angular-bootstrap/ui-bootstrap-tpls.js', 
      _src.vendor + 'fullcalendar/dist/fullcalendar.js',
      _src.vendor + 'html5shiv/dist/html5shiv.js',
      _src.vendor + 'json3/lib/json3.js',
      _src.vendor + 'modernizr/modernizr.js',
      _src.vendor + 'lodash/dist/lodash.js',
      _src.vendor + 'ng-csv/build/ng-csv.js',
      _src.vendor + 'select2/select2.js',
      _src.vendor + 'angular-ui-select/dist/select.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(_dest.scripts));
});

gulp.task('concatBuildJS', function() {
    return gulp.src(_src.scripts + '**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest(_dest.scripts));
});

// Concat files | vendor css
gulp.task('concatVendorCss', function () {
    gulp.src([ 
        _src.vendor + 'bootstrap/dist/css/bootstrap-theme.min.css',
        _src.vendor + 'fullcalendar/dist/fullcalendar.min.css',
        _src.vendor + 'fullcalendar/dist/fullcalendar.print.css',
        _src.vendor + 'angular-ui-select/dist/select.css'
        ])
        .pipe(concatCss('vendor.css'))
        .pipe(gulp.dest(_dest.styles));
});

// Concat files | css
gulp.task('concatCss', function () {
    gulp.src([
        _src.styles + '**/*.css',
        '!' + _src.styles + 'main.css'
        ])
        .pipe(concatCss('base.css'))
        .pipe(gulp.dest(_dest.styles));
});

// Copy assets | img
gulp.task('copyImg', function() { 
    return gulp.src(_src.images + '**/*.*')
        .pipe(gulp.dest(_dest.images)) ;
});

// Copy assets | webfonts
gulp.task('copyFonts', function() { 
    return gulp.src(_src.fonts + '**/*.*')
        .pipe(gulp.dest(_dest.fonts)) ;
});

// Copy assets | main css
gulp.task('copyMainCss', function() { 
    return gulp.src(_src.styles + 'main.css')
        .pipe(gulp.dest(_dest.styles));
});

// Copy assets | html
gulp.task('copyHtml', function() { 
    // Exclude index.html which is copied over next as index.cshtml
    var ignoreIndex = "**/index.html";
    return gulp.src(_src.root + '**/*.html', { base: 'app/src/' })
        .pipe(gulpIgnore.exclude(ignoreIndex))
        .pipe(gulp.dest(_dest.root));
});

// Copy assets | Index.cshtml 
gulp.task('copyIndex', function() { 
    return gulp.src(_src.root + 'index.html')
        .pipe(rename('Index.cshtml'))
        .pipe(gulp.dest(_dest.index));
});

// Copy assets | min maps
gulp.task('copyMinMap', function() { 
    return gulp.src([
        _src.vendor + 'angular/angular.min.js.map',
        _src.vendor + 'angular-sanitize/angular-sanitize.min.js.map',
        _src.vendor + 'angular-animate/angular-animate.min.js.map',
        _src.vendor + 'angular-route/angular-route.min.js.map'
        ])
        .pipe(gulp.dest(_dest.scripts));
});

// Compile sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(_dest.styles));
});

/* Init */

// Gulp 
gulp.task('default', ENV.dev);     

// Gulp watch 
//gulp.task('watch', function() {
//    gulp.watch('js/*.js', ['lint', 'scripts']);
//    gulp.watch('scss/*.scss', ['sass']);
//});


/* END */
