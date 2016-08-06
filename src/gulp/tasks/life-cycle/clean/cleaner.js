
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * The Cleaner phase is where we run tasks to delete all generated files.
 *
 * @class CleanerTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class CleanerTaskLoader extends AbstractTaskLoader {

  registerTask (gulp) {
    super.registerTask(gulp)

    runSequence = runSequence.use(gulp)

    gulp.task('cleaner', 'Delete all generated files', () => {
      gutil.log(gutil.colors.green('Cleaner task being run'))

      // Get tasks associated with the initialize life-cycle phase.
      let tasks = ['delete']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Cleaner Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new CleanerTaskLoader()
