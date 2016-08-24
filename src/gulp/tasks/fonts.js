
'use strict'

import gutil from 'gulp-util'
import eventStream from 'event-stream'
import size from 'gulp-size'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

class LogTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'fonts'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Copy fonts to dist directory'))

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let src = null

      if (gulp.options.folders) {
        src = gulp.options.folders.src + '/' + config.globs.fonts
      } else {
        src = config.fonts.src
      }

      return gulp.plumbedSrc(
        src, {
          dot: true
        })

        // Display the files in the stream
        // .pipe(debug({title: 'Stream contents:', minimal: true}))

        // Filter out the empty directories
        .pipe(utils.filterEmptyDirectories(eventStream))

        // Display the files in the stream
        // .pipe(debug({title: 'Stream contents:', minimal: true}))

        // Copy
        .pipe(gulp.dest(config.fonts.dest))

        // Task result
        .pipe(size({
          title: 'fonts'
        }))
    })
  }
}

module.exports = new LogTaskLoader('resources')
