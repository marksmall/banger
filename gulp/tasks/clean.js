'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
import del from 'del'

import config from '../config'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

gulp.task('clean', 'Clean output directories', () => {
  del([
    config.folders.dist + config.globs.any
  ], {
    dot: true
  })
})
