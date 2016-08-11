
'use strict'

import gutil from 'gulp-util'
import eventStream from 'event-stream'
import cache from 'gulp-cache'
import imageMin from 'gulp-imagemin'
import size from 'gulp-size'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

class ImagesTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'images'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Optimize images'))

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let src = null

      if (gulp.options.folders) {
        src = [ gulp.options.folders.app + config.globs.images ]
      } else {
        src = config.images.src
      }

      return gulp.plumbedSrc(
        src
      )
      // Filter out the empty directories
      .pipe(utils.filterEmptyDirectories(eventStream))

      // Display the files in the stream
      // .pipe(debug({title: 'Stream contents:', minimal: true}))

      // Minify and cache
      .pipe(cache(imageMin({
        progressive: true,
        interlaced: true
      })))

      // Output files
      .pipe(gulp.dest(config.images.dest))

      // Task result
      .pipe(size({
        title: 'images'
      }))
    })
  }
}

module.exports = new ImagesTaskLoader('resources')
