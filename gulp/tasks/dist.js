'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
import changed from 'gulp-changed'
import babel from 'gulp-babel'
import size from 'gulp-size'
// import iff from 'gulp-if'
// import debug from 'gulp-debug'

import config from '../config'
import utils from '../utils'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

gulp.task('dist', 'Transpile JavaScript (ES2015 to ES5 using Babel)', ['js-lint'], () => {
  return utils.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
    config.javascript.src
  )

  // Display the files in the stream
  // .pipe(debug({title: 'Stream contents:', minimal: true}))

  // speed things up by ignoring unchanged resources
  .pipe(changed(config.javascript.dest))

  // Transpile ES2015 to ES5
  // options: https://babeljs.io/docs/usage/options/
  .pipe(babel())

  // Copy files
  .pipe(gulp.dest(config.javascript.dest))

  // Display the files in the stream
  // .pipe(debug({title: 'Stream contents:', minimal: true}))

  // Task result
  .pipe(size({
    title: 'dist'
  }))
})
