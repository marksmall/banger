
'use strict'

import gutil from 'gulp-util'
import path from 'path'
import sass from 'gulp-sass'
import cssimport from 'gulp-cssimport'
import concat from 'gulp-concat'
import csso from 'gulp-csso'
import minifyCss from 'gulp-minify-css'
import size from 'gulp-size'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

class StylesDistTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'styles-app'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Optimize and minimize stylesheets for production'))

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let src = null

      if (gulp.options.folders) {
        src = [
          gulp.options.folders.src + config.globs.styles.css,
          gulp.options.folders.src + config.globs.styles.sass,
          utils.exclude(path.join(gulp.options.folders.src, config.globs.styles.vendor))
        ]
      } else {
        src = config.styles.srcWithoutVendor
      }

      return gulp.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
        src
      )

      // Display the files in the stream
      // .pipe(debug({title: 'Stream contents:', minimal: true}))

      // Process Sass files
      .pipe(sass({
        style: 'compressed'
        // errLogToConsole: true
      }))

      // Replace CSS imports by actual contents
      .pipe(cssimport())

      // Remove any unused CSS
      // Note that it breaks the sourcemaps (but we shouldn't care for dist since we don't need sourcemaps there)
      // Note that it also causes weird output during build in combination w/ Angular
      // .pipe($.uncss({
      //   html: [
      //     config.html.src
      //   ],
      //   // CSS Selectors for UnCSS to ignore
      //   ignore: [
      //   ]
      // }))

      // Regroup all files together
      .pipe(concat(config.styles.finalCssBundleFilename))

      // Optimize and minimize
      .pipe(csso()) // https://www.npmjs.com/package/gulp-csso
      .pipe(minifyCss(
        config.minifyCss
      ))

      // Output file
      .pipe(gulp.dest(config.styles.destDist))

      // Task result
      .pipe(size({
        title: 'styles-dist'
      }))
    })
  }
}

module.exports = new StylesDistTaskLoader('dist')
