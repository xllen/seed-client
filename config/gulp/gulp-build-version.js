var gulp = require('gulp');
var replace = require('replace-in-file');
var moment = require('moment');

var version = require('../config').version;
var buildDate = '+' + moment(new Date()).format('YYMMDDHH');

gulp.task('version', (cb) => {
  var options = {
    files: 'src/environments/environment.prod.ts',
    from: /version: '(.*)'/g,
    to: "version: '" + version + buildDate + "'",
    allowEmptyPath: false
  }

  let changeFile = replace.sync(options)
  cb();
})
