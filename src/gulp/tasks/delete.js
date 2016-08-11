
'use strict'

import gutil from 'gulp-util'
import del from 'del'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
// import utils from '../../utils'

class DeleteTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'delete'
    this.phase = phase
  }

  registerTask (gulp, lifecycle) {
    super.registerTask(gulp, lifecycle)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Delete task being run'))
      del([
        config.folders.temp,
        config.folders.dist
      ], {
        dot: true
      })
    })
  }
}

module.exports = new DeleteTaskLoader('cleaner')
