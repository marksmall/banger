
'use strict'

import gutil from 'gulp-util'
import sassLint from 'gulp-sass-lint'
import size from 'gulp-size'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

class SassLintTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'sass-lint'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Lint SASS Code'))
      let src = utils.getCssFolder(gulp, config)

      return gulp.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
        src // only the application's code needs to be checked
      )

      // Display the files in the stream
      // .pipe(debug({title: 'Stream contents:', minimal: true}))

      // Check the code quality
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())

      // Task result
      .pipe(size({
        title: 'sass-lint'
      }))
    })
  }
}

module.exports = new SassLintTaskLoader('validate')
