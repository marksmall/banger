
'use strict'

import gutil from 'gulp-util'
// import packageJsonValidator from 'gulp-nice-package'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class PackageJsonTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('validate-package-json', false, () => {
      gutil.log(gutil.colors.green('Validate package.json task being run'))

    //   return utils.plumbedSrc(config.files.packageJSON)
    //               .pipe(packageJsonValidator())
    })
  }
}

module.exports = new PackageJsonTaskLoader()
