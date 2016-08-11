
'use strict'

import gutil from 'gulp-util'
import changed from 'gulp-changed'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import size from 'gulp-size'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

class JsCompileTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'js-compile'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Transpile JavaScript (ES2015 to ES5 using Babel) and generate sourcemaps'))

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let src = utils.getJavaScriptFolder(gulp, config)

      return gulp.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
        src
      )

      // Display the files in the stream
      // .pipe(debug({title: 'Stream contents:', minimal: true}))

      // speed things up by ignoring unchanged resources
      .pipe(changed(config.javascript.dest))

      // Initialize sourcemap generation
      .pipe(sourcemaps.init({
        loadMaps: true
        // debug: true
      }))

      // Transpile ES2015 to ES5
      // options: see .babelrc file
      .pipe(babel())

      // Write sourcemaps: https://www.npmjs.com/package/gulp-sourcemaps
      // .pipe($.sourcemaps.write()) // use '.' to write the sourcemap to a separate file in the same dir
      .pipe(sourcemaps.write('.', { // use '.' to write the sourcemap to a separate file in the same dir
        includeContent: false, // alternative: include the contents and remove sourceRoot. Avoids issues but prevents from editing the sources directly in the browser
        sourceRoot: '/' // use an absolute path because we have scripts in different subpaths
      }))

      // Copy files
      .pipe(gulp.dest(config.javascript.dest))

      // Display the files in the stream
      // .pipe(debug({title: 'Stream contents:', minimal: true}))

      // Task result
      .pipe(size({
        title: 'Compile JavaScript'
      }))
    })
  }
}

module.exports = new JsCompileTaskLoader('compile')
