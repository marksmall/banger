
'use strict'

import gutil from 'gulp-util'
import path from 'path'
// import runSequence from 'run-sequence'
// import iff from 'gulp-if'
// import gutil from 'gulp-util'
// import debug from 'gulp-debug'

import AbstractTaskLoader from '../../abstract-task-loader'
// import config from '../../config'
import utils from '../../utils'

class UnitTestTaskLoader extends AbstractTaskLoader {

  constructor (phase) {
    super(phase)
    this.name = 'unit-test'
    this.phase = phase
  }

  registerTask (gulp) {
    super.registerTask(gulp)

    // let run = runSequence.use(gulp) // needed to bind to the correct gulp object (alternative is to pass gulp to runSequence as first argument)

    let karmaConfigFilePath = path.resolve('karma.conf.js')

    let options = {
      path: karmaConfigFilePath,
      singleRun: true
    }

    gulp.task(this.name, false, (callback) => {
      gutil.log(gutil.colors.green('Execute unit tests'))
      return utils.getKarmaServer(options, callback)
    })
  }
}

module.exports = new UnitTestTaskLoader('test')
