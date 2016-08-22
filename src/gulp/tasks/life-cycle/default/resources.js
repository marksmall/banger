
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('resources', 'Generate resources used by the project', ['test'], (callback) => {
      gutil.log(gutil.colors.green('Generate resources used by the project'))

      // Get tasks associated with the initialize life-cycle phase.
    //   let tasks = ['html', 'images']
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'resources') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Resources Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks, callback)
    })
  }
}

module.exports = new ResourcesTaskLoader()
