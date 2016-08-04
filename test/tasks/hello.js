'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
import gutil from 'gulp-util'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

gulp.task('hello', 'Example Task', () => {
  gutil.log(gutil.colors.green('Example Task Starting...'))

  gutil.log(gutil.colors.green('Example Task Ending...'))
})
