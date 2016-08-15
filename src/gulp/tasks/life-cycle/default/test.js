
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('test', 'Generate Test used by the project', ['compile'], (callback) => {
      gutil.log(gutil.colors.green('Generate Test used by the project'))

      // Get tasks associated with the Test life-cycle phase.
    //   let tasks = ['unit-test']
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'test') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Test Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks, callback)
    })
  }
}

module.exports = new TestTaskLoader()
