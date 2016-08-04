
import path from 'path'

let cleanLifecycle = ['pre-clean', 'clean', 'post-clean']

let buildLifecycle = ['validate', 'initialize', 'resources', 'compile', 'test-compile', 'test', 'package', 'deploy']

const extensions = {
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

let src = './src/main/app/'

let folders = {
  root: './',
  dist: './dist',
  temp: './.tmp',
  src: src,
  styles: src + 'styles',
  scripts: src + 'scripts',
  images: src + 'images',
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

export default {
  buildLifecycle,
  cleanLifecycle,
  files
}
