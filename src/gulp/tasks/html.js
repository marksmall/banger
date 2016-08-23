
'use strict'

import gutil from 'gulp-util'
import * as path from 'path'
import htmlReplace from 'gulp-html-replace'
import inlineSource from 'gulp-inline-source'
import iff from 'gulp-if'
import minifyHtml from 'gulp-minify-html'
import size from 'gulp-size'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
// import utils from '../../utils'

class HtmlTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'html'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, false, () => {
      gutil.log(gutil.colors.green('Optimize HTML'))

      // Determine if the inlined scripts should be minified or not
      let minifyInlinedScripts = true

      if (typeof gulp.options.minifyProductionJSBundle !== 'undefined') {
        minifyInlinedScripts = gulp.options.minifyProductionJSBundle

        if (minifyInlinedScripts === false) {
          gutil.log('The inlined scripts will NOT be minified!')
        }
      }

      // Determine if HTML should be minified or not
      let minifyProductionHTML = true

      if (typeof gulp.options.minifyProductionHTML !== 'undefined') {
        minifyProductionHTML = gulp.options.minifyProductionHTML

        if (minifyProductionHTML === false) {
          gutil.log('The HTML will NOT be minified!')
        }
      }

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let src = null

      if (gulp.options.folders) {
        src = [ gulp.options.folders.src + config.globs.html ]
      } else {
        src = config.html.src
      }

      return gulp.plumbedSrc(
        src
      )

      // Display the files in the stream
    //   .pipe(debug({title: 'Stream contents:', minimal: true}))

      // Inject production assets path: https://www.npmjs.com/package/gulp-html-replace
      .pipe(htmlReplace({
        'css-vendor': config.styles.finalVendorCssBundlePath,
        'css-bundle': config.styles.finalCssBundlePath,
        'js-app': config.javascript.finalJsBundlePath
      }))

      .pipe(inlineSource({
        // options reference: https://github.com/popeindustries/inline-source#usage
        compress: minifyInlinedScripts,
        rootpath: path.resolve('.') // project root --> directory path used for resolving inlineable paths
      }))

      // Minify HTML
      .pipe(iff(minifyProductionHTML && config.files.any + config.extensions.html, minifyHtml({
        quotes: true // do not remove quotes (Angular 2 does not like that)
      })))

      // Output files
      .pipe(gulp.dest(config.html.dest))

      // Task result
      .pipe(size({
        title: 'html'
      }))
    })
  }
}

module.exports = new HtmlTaskLoader('resources')
