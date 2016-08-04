
'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
import packageJsonValidator from 'gulp-nice-package'

import config from '../config'
import utils from '../utils'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

gulp.task('validate-package-json', 'Validate the package.json file', () => {
  return utils.plumbedSrc(config.files.packageJSON)
              .pipe(packageJsonValidator())
})
