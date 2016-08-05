
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

class CleanTaskLoader extends AbstractTaskLoader {
  registerTask (gulp, lifecycle) {
    super.registerTask(gulp, lifecycle)
    runSequence = runSequence.use(gulp)

    gulp.task('clean', 'Delete generated files', () => {
      gutil.log(gutil.colors.green('Clean task being run'))

      // Get tasks associated with the clean life-cycle phase.
      return runSequence('pre-clean', 'cleaner', 'post-clean')
    })
  }
}

module.exports = new CleanTaskLoader()
