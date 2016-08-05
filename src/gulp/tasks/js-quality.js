
'use strict'

import gutil from 'gulp-util'
// import eslint from 'gulp-eslint'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class JsQualityTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('js-quality', false, () => {
      gutil.log(gutil.colors.green('Validate package.json task being run'))

    //   return utils.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
    //     config.javascript.srcPkg
    //   )

    //   // Display the files in the stream
    //   // .pipe(debug({title: 'Stream contents:', minimal: true}))

    //   // Run ESLint
    //   .pipe(eslint())

    //   // eslint.format() outputs the lint results to the console.
    //   .pipe(eslint.format())

    //   // To have the process exit with an error code (1) on
    //   // lint error, return the stream and pipe to failAfterError last.
    //   .pipe(eslint.failAfterError())

    //   // Fail the build only if BrowserSync is not active
    //   // Actually, failing the build is counter-productive thus evil
    //   // .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    })
  }
}

module.exports = new JsQualityTaskLoader()
