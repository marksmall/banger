
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('cleaner', false, () => {
      gutil.log(gutil.colors.green('Cleaner task being run'))

      // Get tasks associated with the initialize life-cycle phase.
    //   let tasks = ['delete']
      let tasks = null
      utils.cleanLifecycle.forEach(function (element) {
        if (element.id === 'cleaner') {
          tasks = element.tasks
        }
      }, this)

      gutil.log(gutil.colors.green('Cleaner Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks)
    })
  }
}

module.exports = new CleanerTaskLoader()
