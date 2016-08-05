
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * Generate resources used by the project:
 *
 * * image sprites
 * * source-maps
 *
 * @class ResourcesTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class ResourcesTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('resources', 'Generate resources used by the project', ['initialize'], () => {
      gutil.log(gutil.colors.green('Initialize task being run'))

      // Get tasks associated with the initialize life-cycle phase.
      let tasks = ['source-maps', 'log']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Resources Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new ResourcesTaskLoader()
