
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class SourceMapsTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('source-maps', false, () => {
      gutil.log(gutil.colors.green('Source Maps task being run'))
    })
  }
}

module.exports = new SourceMapsTaskLoader()
