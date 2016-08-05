
'use strict'

import gutil from 'gulp-util'
// import tslint from 'gulp-tslint'
// import size from 'gulp-size'
// import iff from 'gulp-if'
// import gutil from 'gulp-util'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class TsLintTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task('ts-lint', false, () => {
      gutil.log(gutil.colors.green('Lint TypeScript Code'))
    //   let src = null

    //   if (gulp.options.folders) {
    //     src = [ gulp.options.folders.app + config.globs.scripts.typescript ]
    //   } else {
    //     src = config.typescript.srcAppOnly
    //   }

    //   return gulp.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
    //     src // only the application's code needs to be checked
    //   )

    //   // Display the files in the stream
    //   // .pipe(debug({title: 'Stream contents:', minimal: true}))

    //   // Check the code quality
    //   .pipe(tslint())

    //   // Fail the build only if BrowserSync is not active
    // //   .pipe(iff(!browserSync.active, tslint.report('prose')))
    // //   .pipe(iff(browserSync.active, tslint.report('prose', {
    // //     emitError: false
    // //   })))

    //   // Task result
    //   .pipe(size({
    //     title: 'ts-lint'
    //   }))
    })
  }
}

module.exports = new TsLintTaskLoader()
