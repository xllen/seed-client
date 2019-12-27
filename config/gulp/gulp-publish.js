var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var jsonEditor = require('gulp-json-editor');

var config = require('../config');

// 清理发布目录
gulp.task('clean', () => {
  return del(['publish'])
})

// 清除package.json中不需要的属性
gulp.task('editPackage', ['clean'], () => {
  return gulp.src('package.json')
    .pipe(jsonEditor({
      'scripts': '',
      'dependencies': '',
      'devDependencies': '',
      'config': ''
    }))
    .pipe(gulp.dest('publish'))
})

// 复制打包目录
gulp.task('copy', ['editPackage'], () => {
  return gulp.src('dist/**')
    .pipe(gulp.dest('publish/dist'))
})

// 设置npm用户
gulp.task('npmSetConfig', ['copy'], shell.task([
  'npm set //' + config.npmPublish.ip + '/:username=' + config.npmPublish.username,
  'npm set //' + config.npmPublish.ip + '/:_password=' + config.npmPublish.password,
  'npm set //' + config.npmPublish.ip + '/:email=' + config.npmPublish.email,
  'npm set //' + config.npmPublish.ip + '/:always-auth=false',
]));

gulp.task('npmPublish', ['npmSetConfig'], shell.task([
  'cd publish && npm publish'
]));
