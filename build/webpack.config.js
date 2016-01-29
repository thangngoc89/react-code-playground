import webpackConfigurator from 'webpack-configurator'
import webpack from 'webpack'
import config from '../config'
const paths = config.utils_paths

const result = () => {
  let WpConfig = new webpackConfigurator()

  WpConfig.merge({
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
      devtool: 'eval',
      debug: true,
      watch: true
    })
  }

  // ------------------------------------
  // Loader
  // ------------------------------------
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
    WpConfig.plugin('no-error', webpack.NoErrorsPlugin)
    WpConfig.plugin('hmr', webpack.HotModuleReplacementPlugin)
  }

  return WpConfig.resolve()
}

export default result()
