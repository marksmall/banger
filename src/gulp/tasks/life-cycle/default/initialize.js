
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
import utils from '../../../../utils'

let runSequence = require('run-sequence')

/**
 * Create directories and any other necessary project structure before project can be built.
 *
 * @class InitializeTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class InitializeTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('initialize', 'Initialize the build', ['validate'], () => {
      gutil.log(gutil.colors.green('Initialize the build'))

      // Get tasks associated with the initialize life-cycle phase.
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'initialize') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Initialize Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks)
    })
  }
}

module.exports = new InitializeTaskLoader()
