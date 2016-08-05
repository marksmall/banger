
'use strict'

import gutil from 'gulp-util'

import AbstractTaskLoader from '../../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class PostCleanTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('post-clean', false, () => {
      gutil.log(gutil.colors.green('Post-Clean task being run'))
    })
  }
}

module.exports = new PostCleanTaskLoader()
