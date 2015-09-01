/* file: gulpfile.js */
'use strict';


var gulp   = require('gulp'),
    gutils = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf');

var config = {
     sassPath: './source/scss',
     componentPath: './node_modules' ,
    jsAssets: './public/assets/javascript',
    cssAssets: './public/assets/css'
}

// LOCAL SERVER SET UP
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'public' folder as rootfolder
server.use(express.static('./public'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
/*server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'public' });
});*/

// Clean task
gulp.task('clean', function() {
	gulp.src('./public/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

gulp.task('thirdPartyScripts', function() {
  return gulp.src([config.componentPath + '/jquery/dist/jquery.min.js',
                  config.componentPath + '/angular/angular.js']) 
      .pipe(gulp.dest(config.jsAssets)); 
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('icons', function() { 
    return gulp.src(config.componentPath + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('build-css', function() {
  return gulp.src(config.sassPath + '/**/*.scss')
           .pipe(sass({
              outputStyle: 'compressed',
              includePaths: [
                  config.componentPath + '/bootstrap-sass/assets/stylesheets',
                  config.componentPath + '/font-awesome/scss',
              ]
          }) 
          .on("error", function (error) {
               return gutils.log("Error: " + error.message);
           }))
           .pipe(gulp.dest('./public/assets/stylesheets')); 
});

// Browserify task
gulp.task('browserify', function() {
  gulp.src(['source/javascript/main.js', 'source/javascript/**/*.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest(config.jsAssets));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('source/index.html')
  // And put it in the public folder
  .pipe(gulp.dest('public/'));

  // Any other view files from source/views
  gulp.src('./source/views/**/*')
  // Will be put in the public/views folder
  .pipe(gulp.dest('public/views/'));
});

/* watch task for running jshint and compiling sass */
gulp.task('watch', ['jshint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  gulp.watch('source/javascript/**/*.js', ['jshint', 'browserify']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch(['source/index.html', 'source/views/**/*.html'], [
    'views'
  ]);
});

gulp.watch('./public/**').on('change', refresh.changed);

// task that builds front-end components
gulp.task('build-front', ['clean', 'views', 'build-css', 'icons']);

// task that builds back-end components
gulp.task('build-back', ['thirdPartyScripts','jshint', 'browserify']);

// define the default task
gulp.task('default', ['build-front', 'build-back', 'watch']);
