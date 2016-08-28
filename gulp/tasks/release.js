
'use strict'

import gulp from 'gulp'
import help from 'gulp-help'
// import debug from 'gulp-debug'

import conventionalChangelog from 'gulp-conventional-changelog'
import conventionalGithubReleaser from 'conventional-github-releaser'
import bump from 'gulp-bump'
import gutil from 'gulp-util'
import git from 'gulp-git'
import fs from 'fs'

import config from '../config'
// import utils from '../utils'

// provide help through 'gulp help'
// The help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp)

let runSequence = require('run-sequence')

gulp.task('changelog', 'Generate a CHANGELOG', ['dist'], () => {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
  .pipe(conventionalChangelog({
    preset: 'angular' // Or to any other commit message convention you use.
  }))
  .pipe(gulp.dest(config.folders.root))
})

gulp.task('github-release', 'Generate a GitHub release based on GIT metadata', (done) => {
  conventionalGithubReleaser({
    type: 'oauth',
    token: 'a3ad503a17ac5fb9262dec8a70c725a0609da0f7' // change this to your own GitHub token or use an environment variable
  }, {
    preset: 'angular' // Or to any other commit message convention you use.
  }, done)
})

gulp.task('bump-version', 'Increment the project version', () => {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src([config.files.packageJSON])
    .pipe(bump({type: 'patch'}).on('error', gutil.log))
    .pipe(gulp.dest(config.folders.root))
})

gulp.task('commit-changes', 'Commit pre-release changes i.e. version increment, CHANGELOG etc', () => {
  return gulp.src(config.folders.root)
    .pipe(git.add())
    .pipe(git.commit('[Pre-release] Incremented version number'))
})

gulp.task('push-changes', 'Push changes to server', (callback) => {
  git.push('origin', 'master', callback)
})

gulp.task('create-new-tag', 'Tag a new release', (callback) => {
  let version = getPackageJsonVersion()
  git.tag(version, 'Created Tag for version: ' + version, (error) => {
    if (error) {
      return callback(error)
    }
    git.push('origin', 'master', {args: '--tags'}, callback)
  })

  function getPackageJsonVersion () {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync(config.files.packageJSON, 'utf8')).version
  }
})

let spawn = require('child_process').spawn

gulp.task('npm-publish', (callback) => {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', callback)
})

gulp.task('release', 'Generate a new release of project', (callback) => {
  runSequence(
    'bump-version',
    'changelog',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    'github-release',
    'npm-publish',
    (error) => {
      if (error) {
        console.log(error.message)
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY')
      }
      callback(error)
    })
})
