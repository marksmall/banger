
'use strict'

import gutil from 'gulp-util'
// fix for SPAs w/ BrowserSync & others: https://github.com/BrowserSync/browser-sync/issues/204
import historyApiFallback from 'connect-history-api-fallback'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
import config from '../../config'
// import utils from '../../utils'

let browserSync = require('browser-sync').create(config.webServerNames.dev)
let proxyMiddleware = require('http-proxy-middleware')
let runSequence = require('run-sequence')

class ServeDistTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'serve-dist'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    gulp.task(this.name, 'Build and serve the production version i.e. "dist" folder contents', ['dist'], () => {
      gutil.log(gutil.colors.green('Log task being run'))

      runSequence = runSequence.use(gulp) // needed to bind to the correct gulp object (alternative is to pass gulp to runSequence as first argument)

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

      const startBrowserSync = () => {
        browserSync.init({
          notify: false,
          // port: 8000,

          // Customize the BrowserSync console logging prefix
          logPrefix: 'NBWA',

          // Run w/ https by uncommenting 'https: true'
          // Note: this uses an unsigned certificate which on first access
          // will present a certificate warning in the browser.
          // https: true,
          server: {
            baseDir: config.webServerFolders.dist,

            // fix for SPAs w/ BrowserSync & others: https://github.com/BrowserSync/browser-sync/issues/204
            // reference: https://github.com/BrowserSync/browser-sync/issues/204
            // todo extract common middleware config
            middleware: middleware
          },
          reloadDelay: 1000,
          reloadDebounce: 1000
        })
      }

      startBrowserSync() // here we need to ensure that all the other tasks are done before we start BrowserSync

      if (gulp.options.proxy.start) {
        return runSequence(['proxy'])
      }
    })
  }
}

module.exports = new ServeDistTaskLoader()
