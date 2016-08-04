
'use strict'

import gutil from 'gulp-util'
import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

// import packageJsonValidator from 'gulp-nice-package'

class PackageJSONTaskLoader extends AbstractTaskLoader {
  registerTask (gulp, lifecycle) {
    super.registerTask(gulp, lifecycle)

    gulp.task('validate', 'Validate the package.json file', () => {
      gutil.log(gutil.colors.green('Validate task being run'))
    //   return gulp.plumbedSrc(config.files.packageJSON)
    //              .pipe(packageJsonValidator())
    })
  }
}

module.exports = new PackageJSONTaskLoader()
