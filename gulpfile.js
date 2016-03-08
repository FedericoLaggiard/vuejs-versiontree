var gulp = require("gulp");
var exec = require('child_process').exec;
var dir = require("node-dir");
var fs = require("fs");
var browserify = require("browserify");
var source = require('vinyl-source-stream');

gulp.task('build-app', function () {
    return browserify('./app.js')
      .bundle()
      .pipe(source('tree-view.js'))
      .pipe(gulp.dest('./'));
});

gulp.task('build-less', function () {
    exec('./node_modules/less/bin/lessc ./styles/tree.less ./tree.css', function (err, stdout, stderr) {
        if (err) throw err;
    });
});

gulp.task('templates', function () {

    var templates = {};

    dir.readFiles('./templates/',
        function (err, content, filename, next) {
            if (err) throw err;

            var fileName = filename.split('/')[filename.split('/').length - 1].split('.')[0];
            templates[fileName] = content;

            next();
        },
        function (err, files) {
            if (err) throw err;
            var script = "\n  'use strict';\n  module.exports = " + JSON.stringify(templates) + ";";
            fs.writeFile('./templates/templates.js', script);
        });

});

gulp.task('default', [
    'build-less',
    'templates',
    'build-app'
], function () {
    //gulp.watch('./styles/*.less', ['build-less']);
    //gulp.watch('./templates/*.html', ['templates']);
    //gulp.watch('./src/*.js', ['build-app']);
});
