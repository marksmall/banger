
import path from 'path'

import utils from './utils'

let extensions = {
  javascript: '.js',
  typescript: '.ts',
  css: '.css',
  sass: '.scss',
  html: '.html',
  sourcemap: '.map',
  png: '.png',
  jpg: '.jpg',
  jpeg: '.jpeg',
  gif: '.gif',
  svg: '.svg'
}

let folders = {
  root: './',
  dist: './dist',
  temp: './.tmp',
  src: './src/main/app/',
  styles: './styles',
  scripts: './scripts',
  images: './images',
  typings: './typings',
  nodeModules: './node_modules',
  jspmPackages: './jspm_packages'
}

let globs = {
  any: '/**/*',
  scripts: {
    javascript: '/**/*' + extensions.javascript,
    typescript: '/**/*' + extensions.typescript
  },
  styles: {
    css: '/**/*' + extensions.css,
    sass: '/**/*' + extensions.sass,
    vendor: path.join(folders.styles, '/vendor' + '{' + extensions.sass + ',' + extensions.css + '}')
  },
  images: path.join(folders.images, '/**/*' + '{' + extensions.png + ',' + extensions.jpg + ',' + extensions.jpeg + ',' + extensions.gif + ',' + extensions.svg + '}'),
  html: '/**/*' + extensions.html,
  sourcemaps: '/**/*' + extensions.sourcemap
}

let files = {
  any: '*',
  packageJSON: path.join(folders.root, 'package.json'),
  typeScriptDefinitions: path.join(folders.typings, globs.scripts.typescript),
  systemjsConfigDefault: 'jspm.conf.js'
}

let buildTime = new Date().toISOString().replace(/-|:/g, '')

let finalJsBundleName = 'bundle.min.' + buildTime + extensions.javascript

let javascript = {
  src: [
    path.join(folders.src, globs.scripts.javascript)
  ],
  srcDist: path.join(folders.temp, '/core/boot.js'),
  dest: folders.temp,
  destDist: path.join(folders.dist, folders.scripts, finalJsBundleName),
  finalJsBundlePath: path.join(folders.scripts, finalJsBundleName)
}
console.log(`Dist parts: ${folders.dist}, ${folders.scripts}, ${finalJsBundleName}`)

let typescript = {
  srcAppOnly: [
    path.join(folders.src, globs.scripts.typescript)
  ],
  dest: folders.temp // JavaScript code is emitted in the temp folder
}

let finalCSSBundleName = 'bundle.min.' + buildTime + '.css'
let finalCSSVendorBundleName = 'vendor.min.' + buildTime + '.css'

let styles = {
  src: [
    path.join(folders.src, globs.styles.css),
    path.join(folders.src, globs.styles.sass)
  ],
  srcVendorOnly: [
    path.join(folders.src, globs.styles.vendor)
  ],
  srcWithoutVendor: [
    path.join(folders.src, globs.styles.css),
    path.join(folders.src, globs.styles.sass),
    utils.exclude(path.join(folders.src, globs.styles.vendor))
  ],
  dest: folders.temp, // for DEV
  destFiles: path.join(folders.temp, globs.styles.css), // for DEV
  destDist: path.join(folders.dist, folders.styles), // for PROD
  finalCssBundleFilename: finalCSSBundleName,
  finalCssBundlePath: path.join(folders.styles, finalCSSBundleName),
  finalVendorCssBundleFilename: finalCSSVendorBundleName,
  finalVendorCssBundlePath: path.join(folders.styles, finalCSSVendorBundleName)
}

let images = {
  src: [
    path.join(folders.src, globs.images)
  ],
  dest: path.join(folders.dist, folders.images)
}

let html = {
  src: [
    path.join(folders.src, globs.html)
  ],
  dest: folders.dist
}

let webServerFolders = {
  dev: [
    // the order IS important. Folders above have precedence
    folders.root, // necessary to have jspm_packages & jspm config file without needing a copy step
    folders.temp, // before app so that ES5 code emitted by TypeScript/Babel takes precedence over ES2015 code that might be written in the app folder
    folders.src
  ],
  dist: [
    folders.dist
  ]
}

let webServerNames = {
  dev: 'MDW_DEV',
  dist: 'MDW_DIST'
}

export default {
  extensions,
  files,
  folders,
  globs,
  javascript,
  typescript,
  styles,
  images,
  html,
  webServerFolders,
  webServerNames
}
