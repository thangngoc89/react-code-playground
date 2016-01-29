/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:config:base')

const config = {
  env : process.env.NODE_ENV || 'development',
  // ----------------------------------
  // Project structure
  // ----------------------------------
  path_base   : path.resolve(__dirname, '../'),
  dir_client  : 'src',
  dir_demo    : 'demo',
  dir_dist    : 'dist',
  hmr         : argv.hot,

  // ----------------------------------
  // Dev Server config
  // ----------------------------------
  server_host : '0.0.0.0',
  server_port : 3000
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production'
}

config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base   : base,
    src    : base.bind(null, config.dir_client),
    demo   : base.bind(null, config.dir_demo),
    dist   : base.bind(null, config.dir_dist)
  }
})()

debug (`Generated config for ${config.env} environment`)

export default config
