
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

let runSequence = require('run-sequence')

/**
 * The validate phase is where we check files:
 *
 *  * well-formed package.json
 *  * lint code (JavaScript,TypeScript,SASS)
 *
 * @class ValidateTaskLoader
 *
 * @extends {AbstractTaskLoader}
 */
class ValidateTaskLoader extends AbstractTaskLoader {

  registerTask (gulp) {
    super.registerTask(gulp)

    runSequence = runSequence.use(gulp)

    gulp.task('validate', 'Validate the package.json file', () => {
      gutil.log(gutil.colors.green('Validate task being run'))

      // Get tasks associated with the initialize life-cycle phase.
      let tasks = ['validate-package-json', 'ts-lint']
      let userTasks = []

      // Merge with user defined tasks
      tasks = [...tasks, ...userTasks]
      gutil.log(gutil.colors.green(`Validate Phase - Running sub-tasks ${tasks}`))
      return runSequence(tasks)
    })
  }
}

module.exports = new ValidateTaskLoader()
