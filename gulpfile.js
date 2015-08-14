var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var path = require('path');
var fs = require('fs');
var mkpath = require('mkpath');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var PATHS = {
  src: {
    js: 'src/**/*.js',
    html: 'src/**/*.html',
    css : [
        'dist/css/index.css',
        'dist/css/**/*.css'
    ],
    sass : ['src/**/*.scss']
  },
  lib: [
    'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
    'node_modules/systemjs/lib/extension-register.js',
    'node_modules/angular2/node_modules/zone.js/zone.js',
    'node_modules/whatwg-fetch/fetch.js',
    'node_modules/jwt-decode/build/jwt-decode.js',
    'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js',
    'node_modules/moment/moment.js'
  ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('clean-dist-css', function(done) {
    del(['dist/css'], done);
});

gulp.task('sass',['clean-dist-css'], function () {
  gulp.src(PATHS.src.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(concat('build.css'))
      .pipe(gulp.dest('dist'));
});


gulp.task('js', function () {
  return gulp.src(PATHS.src.js)
    .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(plumber())
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(gulp.dest('dist'));
});


gulp.task('html', function () {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest('dist'));
});



gulp.task('libs', ['angular2', 'router'], function () {
  var size = require('gulp-size');
  return gulp.src(PATHS.lib)
    .pipe(size({showFiles: true, gzip: true}))
    .pipe(gulp.dest('dist/lib'));
});


gulp.task('angular2', function () {
  var buildConfig = {
    paths: {
      "angular2/*": "node_modules/angular2/es6/prod/*.es6",
      "rx/*": "node_modules/angular2/node_modules/rx/*.js"
    }
  };

  var Builder = require('systemjs-builder');
  var builder = new Builder(buildConfig);

  return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});


gulp.task('router', function () {
  var buildConfig = {
    paths: {
      "angular2/*": "node_modules/angular2/es6/prod/*.es6",
      "rx/*": "node_modules/angular2/node_modules/rx/*.js"
    }
  };

  var Builder = require('systemjs-builder');
  var builder = new Builder(buildConfig);

  return builder.build('angular2/router', 'dist/lib/router.js', {});
});


gulp.task('play', ['default'], function () {
  var http = require('http');
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var open = require('open');
  var port = 3000;
  var app;

  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.js, ['js']);
  gulp.watch(PATHS.src.sass, ['sass']);

  app = connect();

  app.use(serveStatic(__dirname + '/dist'));  // serve everything that is static

  http.createServer(app).listen(port, function () {
    console.log('\n', 'Server listening on port', port, '\n')
    // open('http://localhost:' + port);
  });
});

gulp.task('default', ['js', 'sass', 'html', 'libs']);