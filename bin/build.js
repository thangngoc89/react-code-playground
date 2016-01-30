import webpack from './webpack'
import wpConfig from '../build/webpack.config'
import fs from 'fs-extra'
import config from '../config'

const debug = require('debug')('playground:bin:build')

const paths = config.utils_paths

debug('Start build')
fs.emptyDirSync(paths.dist())

webpack(wpConfig, (err) => {
  debug('Webpack build success')
  debug('Copy static files')
  fs.copySync(paths.demo('vendor'), paths.dist('vendor'))
  debug('Done')
})
