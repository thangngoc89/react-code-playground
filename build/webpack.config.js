import webpackConfigurator from 'webpack-configurator'
import webpack from 'webpack'
import config from '../config'
const paths = config.utils_paths

const result = () => {
  let WpConfig = new webpackConfigurator()

  WpConfig.merge({
    target: 'web',
    colors: true,
    progress: true,
    output: {
      filename: 'bundle.js',
      path: paths.dist()
    },
    resolve: {
      extensions: ['', '.js']
    }
  })

  if (config.env === 'development') {
    WpConfig.merge({
      entry: {
        app: [
          paths.demo('app'),
          'webpack-hot-middleware/client?path=/__webpack_hmr'
        ]
      },
      devtool: 'cheap-module-eval-source-map',
      debug: true,
      watch: true
    })
  }

  // ------------------------------------
  // Loader
  // ------------------------------------
  WpConfig.preLoader('js', {
    test: /\.js$/,
    loader: 'eslint?fix',
    exclude: /node_modules/
  })

  WpConfig.loader('js', {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  })

  const cssLoader = 'css?localIdentName=Playground--[name]-[local]&modules'
  WpConfig.loader('sass', {
    test: /\.scss$/,
    loaders: [
      'style',
      cssLoader,
      'sass'
    ]
  })

  WpConfig.loader('css', {
    test: /\.css$/,
    loaders: [
      'style',
      cssLoader
    ],
    exclude: /node_modules/
  })

  WpConfig.loader('css-global', {
    test: /\.css$/,
    loaders:  [
      'style',
      'css'
    ],
    include: /node_modules/
  })

  // ------------------------------------
  // Loaders
  // ------------------------------------
  WpConfig.plugin('define', webpack.DefinePlugin, [config.globals])

  if (config.env === 'development') {
    WpConfig.plugin('hmr', webpack.HotModuleReplacementPlugin)
  }

  if (config.env === 'production') {
    WpConfig.plugin('occcurenceOrder', webpack.optimize.OccurrenceOrderPlugin)
    WpConfig.plugin('dedupe', webpack.optimize.DedupePlugin)
    WpConfig.plugin('noError', webpack.NoErrorsPlugin)
  }

  return WpConfig.resolve()
}

export default result()
