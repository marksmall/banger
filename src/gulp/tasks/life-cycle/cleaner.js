
'use strict'

import gutil from 'gulp-util'
import del from 'del'

import AbstractTaskLoader from '../../../abstract-task-loader'
import config from '../../../config'
// import utils from '../../utils'

class CleanerTaskLoader extends AbstractTaskLoader {
  registerTask (gulp, lifecycle) {
    super.registerTask(gulp, lifecycle)

    gulp.task('cleaner', false, () => {
      gutil.log(gutil.colors.green('Cleaner task being run'))
      del([
        config.folders.temp,
        config.folders.dist + config.globs.any
      ], {
        dot: true
      })
    })
  }
}

module.exports = new CleanerTaskLoader()
