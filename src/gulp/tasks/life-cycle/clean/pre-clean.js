
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * The pre-clean phase is where we run tasks that must complete before
 * generated files can be deleted.
 *
 * @class PreCleanTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class PreCleanTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('pre-clean', false, () => {
      gutil.log(gutil.colors.green('Pre-Clean task being run'))

      // Get tasks associated with the initialize life-cycle phase.
      let tasks = ['log']
      let userTasks = []
      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new PreCleanTaskLoader()
