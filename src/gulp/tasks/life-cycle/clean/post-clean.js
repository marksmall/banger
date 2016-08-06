
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * The post-clean phase is where we run tasks that must complete after
 * generated files have been deleted.
 *
 * @class PostCleanTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class PostCleanTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('pre-clean', false, () => {
      gutil.log(gutil.colors.green('Post-Clean task being run'))

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

module.exports = new PostCleanTaskLoader()
