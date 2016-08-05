
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * Generate distributable package.
 *
 * @class DistributeTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class DistributeTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('dist', 'Generate distributable package', ['test'], () => {
      gutil.log(gutil.colors.green('Distribute task being run'))

      // Get tasks associated with the Distribute life-cycle phase.
      let tasks = ['source-maps', 'log']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Distribute Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new DistributeTaskLoader()
