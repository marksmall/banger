
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * Generate Test used by the project:
 *
 * * image sprites
 * * source-maps
 *
 * @class TestTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class TestTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('test', 'Generate Test used by the project', ['compile'], () => {
      gutil.log(gutil.colors.green('Test task being run'))

      // Get tasks associated with the Test life-cycle phase.
      let tasks = ['unit-test', 'log']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Test Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new TestTaskLoader()