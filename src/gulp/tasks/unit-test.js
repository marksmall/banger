
'use strict'

import gutil from 'gulp-util'
// import path from 'path'
// import runSequence from 'run-sequence'
// import iff from 'gulp-if'
// import gutil from 'gulp-util'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
// import utils from '../../utils'

class UnitTestTaskLoader extends AbstractTaskLoader {
  registerTask (gulp) {
    super.registerTask(gulp)

    // // let run = runSequence.use(gulp) // needed to bind to the correct gulp object (alternative is to pass gulp to runSequence as first argument)

    // let karmaConfigFilePath = path.resolve('karma.conf.js')

    // let options = {
    //   path: karmaConfigFilePath,
    //   singleRun: true
    // }

    gulp.task('unit-test', false, (callback) => {
      gutil.log(gutil.colors.green('Lint TypeScript Code'))
    //   return utils.getKarmaServer(options, callback)
    })

    // // options.singleRun = false
    // // gulp.task('test-unit-watch', 'Execute all unit tests continuously (watches files)', (callback) => {
    // //   return utils.getKarmaServer(options, callback)
    // // })

    // // gulp.task('prepare-test-unit', 'Do all the necessary preparatory work for the test-unit task', () => {
    // //   return run([
    // //     'clean',
    // //     'ts-lint',
    // //     'check-js-style',
    // //     'check-js-quality'
    // //   ], [
    // //     'scripts-typescript',
    // //     'scripts-javascript'
    // //   ])
    // // })
  }
}

module.exports = new UnitTestTaskLoader()
