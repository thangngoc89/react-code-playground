import webpackConfigurator from 'webpack-configurator'
import webpack from 'webpack'
import config from '../config'
const paths = config.utils_paths

const result = () => {
  let WpConfig = new webpackConfigurator()

  WpConfig.merge({
    entry: {
      app: [
        paths.demo('app'),
        'webpack-hot-middleware/client?path=/__webpack_hmr'
      ]
    },
    debug: true,
    watch: true,
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

  WpConfig.loader('js', {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  })

  WpConfig.loader('sass', {
    test: /\.scss$/,
    loader: 'style!css!sass'
  })

  if (config.env === 'development') {
    WpConfig.plugin('no-error', webpack.NoErrorsPlugin)
    WpConfig.plugin('hmr', webpack.HotModuleReplacementPlugin)
  }

  WpConfig.plugin('define', webpack.DefinePlugin, [config.globals])

  return WpConfig.resolve()
}

export default result()
