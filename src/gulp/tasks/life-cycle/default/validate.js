
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../../abstract-task-loader'
// import config from '../../../../config'
import utils from '../../../../utils'

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

    gulp.task('validate', 'Validate project files, code etc', () => {
      gutil.log(gutil.colors.green('Validate project files, code etc'))

      // Get tasks associated with the initialize life-cycle phase.
    //   let tasks = ['validate-package-json', 'ts-lint', 'js-lint', 'sass-lint']
      let tasks = null
      utils.defaultLifecycle.forEach(function (element) {
        if (element.id === 'validate') {
          tasks = element.tasks
        }
      }, this)

      // Merge with user defined tasks
      gutil.log(gutil.colors.green('Validate Phase - sub-tasks: ') + gutil.colors.blue(tasks))
      return runSequence(tasks)
    })
  }
}

module.exports = new ValidateTaskLoader()
