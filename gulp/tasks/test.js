'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
// import debug from 'gulp-debug'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

let KarmaServer = require('karma').Server // TODO replace by import {Server as KarmaServer} from 'karma'
let path = require('path')
let runSequence = require('run-sequence')

// import config from '../config'
// import utils from '../utils'

let karmaConfigFilePath = path.resolve('karma.conf.js')

gulp.task('test', 'Execute all unit tests', (callback) => {
  return new KarmaServer({
    configFile: karmaConfigFilePath, // necessary otherwise the file is not resolved correctly
    singleRun: true
  }, callback).start()
})

gulp.task('test-unit-dev', 'Execute all unit tests continuously (watches files)', (callback) => {
  return new KarmaServer({
    configFile: karmaConfigFilePath, // necessary otherwise the file is not resolved correctly
    singleRun: false
  }, callback).start()
})

gulp.task('prepare-test-unit', 'Do all the necessary preparatory work for the test-unit task', [
  'clean',
  'js-lint'
], (callback) => {
  return runSequence(['dist'], callback)
})
