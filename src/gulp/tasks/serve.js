
'use strict'

import gutil from 'gulp-util'
// fix for SPAs w/ BrowserSync & others: https://github.com/BrowserSync/browser-sync/issues/204
import historyApiFallback from 'connect-history-api-fallback'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
import utils from '../../utils'

let browserSync = require('browser-sync').create(config.webServerNames.dev)
let proxyMiddleware = require('http-proxy-middleware')
let runSequence = require('run-sequence')

class ServeTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'serve'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, 'Watch files for changes and rebuild/reload automagically', ['compile'], () => {
      gutil.log(gutil.colors.green('Log task being run'))
      runSequence = runSequence.use(gulp) // needed to bind to the correct gulp object (alternative is to pass gulp to runSequence as first argument)

      // TypeScript
      gulp.task('reload', false, () => {
        return browserSync.reload()
      })  // reload BrowserSync once everything is ready

      // configure proxy middleware
      // context: '/' will proxy all requests
      //     use: '/api' to proxy request when path starts with '/api'
      let proxy = null
      let middleware = [
        historyApiFallback(), // not necessary if the app uses hash based routing
        function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*') // add CORS to the response headers (for resources served by BrowserSync)
          next()
        }
      ]

      if (gulp.options.proxy) {
        proxy = proxyMiddleware(gulp.options.proxy.api, {
          target: gulp.options.proxy.target + ':' + gulp.options.proxy.port,
          changeOrigin: true   // for vhosted sites, changes host header to match to target's host
        })

        middleware.unshift(proxy)
      }

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let baseDir = null

      if (gulp.options.folders) {
        baseDir = config.webServerFolders.dev.concat([ gulp.options.folders.src ])
      } else {
        baseDir = config.webServerFolders.dev
      }

      let browserSyncOptions = { // http://www.browsersync.io/docs/options/
        notify: false,
        // port: 8000,

        // Customize the BrowserSync console logging prefix
        logPrefix: 'BANGER', // Banger Build System

        // Run w/ https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        ghostMode: { // replicate actions in all clients
          clicks: false,
          forms: false,
          scroll: false
        },
        server: {
          baseDir: baseDir,
          // routes: alternative way to map content that is above the base dir
          // fix for SPAs w/ BrowserSync & others: https://github.com/BrowserSync/browser-sync/issues/204
          // reference: https://github.com/BrowserSync/browser-sync/issues/204
          // middleware: proxyMiddleware('/api', {target: 'http://localhost:8000'})
          middleware: middleware
        } // ,
        // reloadDebounce: 500 // restrict the frequency in which browser reload events can be emitted to connected clients
      }

      // If the app src folder is overridden, then append it to the watch list, otherwise use default.
      let html = null
      let styles = utils.getCssFolder(gulp, config)
      let typescript = null
      let javascript = null
      let images = null

      if (gulp.options.folders) {
        html = [ gulp.options.folders.src + config.globs.html ]
        typescript = [ gulp.options.folders.src + config.globs.scripts.typescript ]
        javascript = [ gulp.options.folders.src + config.globs.scripts.javascript ]
        images = [ gulp.options.folders.src + config.globs.images ]
      } else {
        html = config.html.src
        typescript = config.typescript.srcAppOnly
        javascript = config.javascript.src
        images = config.images.src
      }

      let startBrowserSync = () => {
        browserSync.init(utils.mergeOptions(browserSyncOptions, gulp.options.browserSync))

        gulp.watch(html).on('change', browserSync.reload) // force a reload when html changes
        gulp.watch(styles, [ 'sass-lint', 'styles' ]) // stylesheet changes will be streamed if possible or will force a reload
        gulp.watch(typescript, [ 'compile', 'reload' ]) // TypeScript changes will force a reload
        gulp.watch(javascript, [ 'compile', 'reload' ]) // JavaScript changes will force a reload
        gulp.watch(images).on('change', browserSync.reload) // force a reload when images change
      }

      startBrowserSync()

      if (gulp.options.proxy.start) {
        return runSequence(['proxy'])
      }
    })
  }
}

module.exports = new ServeTaskLoader()
