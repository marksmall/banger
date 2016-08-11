
/**
 * Rather than manage one giant configuration file, responsible
 * for creating multiple gulp tasks, each task has been broken out
 * into its own file. Any files in that directory get automatically
 * required below.
 *
 * To add a new task, simply add a new task file to that directory.
 * gulp/tasks/default.js specifies the default set of tasks to run
 * when you run `gulp`.
 *
 * Principle taken from gulp-starter: https://github.com/greypants/gulp-starter
 */

'use strict'

import utils from './utils'

import {AbstractTaskLoader} from './abstract-task-loader'
// // module.exports = AbstractTaskLoader
// module.exports = {
// // export {
// // export default {
//   taskLoader: AbstractTaskLoader // ,
// //   loader
// }

/**
 * This class takes care of loading gulp tasks.
 */
class TasksLoader {

  /**
   * Looks for and registers all available tasks.
   *
   * @param inputGulp the gulp object to use. If not provided, it'll be loaded
   * @param inputOptions the build options to use. If not provided, an empty object is used
   */
  registerTasks (inputGulp, inputOptions) {
    let gulp = inputGulp || require('gulp') // this module can be imported without a defined gulp instance
    let options = inputOptions || {}

    gulp = utils.configureGulpObject(gulp, options) // we need to customize the gulp object a bit

    utils.registerTask('./gulp/tasks/life-cycle', gulp, options)
    utils.registerTask('./gulp/tasks/life-cycle/clean', gulp, options)
    utils.registerTask('./gulp/tasks/life-cycle/default', gulp, options)
    utils.registerTask('./gulp/tasks', gulp, options)
    utils.registerTask(options.tasks, gulp, options)
    console.log(`INPUT OPTIONS: ${JSON.stringify(inputOptions)}, OPTIONS: ${JSON.stringify(options)}`)
  }
}

export default new TasksLoader()
// let loader = new TasksLoader()
// let taskLoader = new AbstractTaskLoader()

export {
// // export default {
  AbstractTaskLoader // ,
// //   loader
}

// module.exports = {
//   taskLoader,
//   loader
// }
