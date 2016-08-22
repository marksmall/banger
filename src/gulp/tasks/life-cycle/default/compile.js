
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

let runSequence = require('run-sequence')

/**
 * Compile the source code of the project.
 *
 * @class CompileTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class CompileTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)
    runSequence = runSequence.use(gulp)

    gulp.task('compile', 'Compile the source', ['initialize'], (callback) => {
      gutil.log(gutil.colors.green('Compile the source'))

      // Get tasks associated with the Compile life-cycle phase.
    //   let tasks = ['ts-compile', 'js-compile']
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'compile') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Compile Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks, callback)
    })
  }
}

module.exports = new CompileTaskLoader()
