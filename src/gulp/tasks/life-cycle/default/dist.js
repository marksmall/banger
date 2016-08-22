
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('dist', 'Generate distributable package', ['clean', 'resources'], (callback) => {
      gutil.log(gutil.colors.green('Generate distributable package'))

      // Get tasks associated with the Distribute life-cycle phase.
    //   let tasks = ['styles-vendor', 'styles-app', 'js-app']
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'dist') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Distribute Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks, callback)
    })
  }
}

module.exports = new DistributeTaskLoader()
