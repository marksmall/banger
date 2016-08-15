
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('post-clean', false, (callback) => {
      gutil.log(gutil.colors.green('Post-Clean task being run'))

      // Get tasks associated with the initialize life-cycle phase.
    //   let tasks = ['log']
      let tasks = null
      utils.cleanLifecycle.forEach(function (element) {
        if (element.id === 'post-clean') {
          tasks = element.tasks
        }
      }, this)

      gutil.log(gutil.colors.green('Post-Clean Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks, callback)
    })
  }
}

module.exports = new PostCleanTaskLoader()
