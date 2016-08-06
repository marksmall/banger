
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

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

    gulp.task('compile', 'Compile the source', ['resources'], () => {
      gutil.log(gutil.colors.green('Compile task being run'))

      // Get tasks associated with the Compile life-cycle phase.
      let tasks = ['log']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Compile Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new CompileTaskLoader()
