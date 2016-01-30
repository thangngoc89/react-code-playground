/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'

const debug = _debug('playground:config')

const config = {
  env : process.env.NODE_ENV || 'development',
  // ----------------------------------
  // Project structure
  // ----------------------------------
  path_base   : path.resolve(__dirname, '../'),
  dir_client  : 'src',
  dir_demo    : 'demo',
  dir_dist    : 'dist',
  dir_lib     : 'lib',
  dir_webpack : 'webpack',

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
    dist   : base.bind(null, config.dir_dist),
    lib    : base.bind(null, config.dir_lib),
    webpack: base.bind(null, config.dir_webpack)
  }
})()

debug(`Generated config for ${config.env} environment`)

export default config
