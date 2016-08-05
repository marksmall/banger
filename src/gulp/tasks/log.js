
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class LogTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('log', false, () => {
      gutil.log(gutil.colors.green('Log task being run'))
    })
  }
}

module.exports = new LogTaskLoader()
