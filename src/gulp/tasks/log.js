
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class LogTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'log'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Log task being run'))
    })
  }
}

module.exports = new LogTaskLoader('initialize')
