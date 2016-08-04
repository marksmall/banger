
import gulp from 'gulp'
import help from 'gulp-help'
import requireDir from 'require-dir'
import runSequence from 'run-sequence'
// import gutil from 'gulp-util'
// import config from './src/config'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

// Load all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {
  recurse: true
})

// Default task
gulp.task('default', 'Build production files', [ 'prepare-default' ], (callback) => {
  return runSequence('validate-package-json', [
    'scripts-javascript-dist'
  ], callback)
})

gulp.task('prepare-default', 'Do all the necessary preparatory work for the default task', (callback) => {
  return runSequence('clean', 'check-js-quality', callback)
})

// gulp.task('phase', 'Run phase of default life-cycle', () => {
//   // Get phase of life-cycle to run
// //   gutil.log(gutil.colors.green(`PROCESS ARGUMENTS: ${process.argv}`))
//   let args = process.argv
//   let phase = args[3] || 'validate'
//   phase = phase.replace(/--/, '')
// //   gutil.log(gutil.colors.green(`DEFAULT PHASE: ${phase}`))

//   // Get phases to run
//   let index = config.buildLifecycle.findIndex(element => element === phase)
//   let phases = config.buildLifecycle.slice(0, index + 1)
//   gutil.log(gutil.colors.green(`BUILD PHASES: ${phases}`))

//   // Execute phases of the life-cycle
//   return runSequence('validate')
// })

// // Default task
// gulp.task('default', 'Build production files', ['dm'], () => {
// })
