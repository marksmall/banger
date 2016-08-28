'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
import eslint from 'gulp-eslint'
// import debug from 'gulp-debug'

import config from '../config'
import utils from '../utils'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

gulp.task('js-lint', 'Check JavaScript code quality using JSHint', () => {
  return utils.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
    config.javascript.srcPkg
  )

  // Display the files in the stream
  // .pipe(debug({title: 'Stream contents:', minimal: true}))

  // Run ESLint
  .pipe(eslint())

  // eslint.format() outputs the lint results to the console.
  .pipe(eslint.format())

  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  .pipe(eslint.failAfterError())

  // Fail the build only if BrowserSync is not active
  // Actually, failing the build is counter-productive thus evil
  // .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
})
