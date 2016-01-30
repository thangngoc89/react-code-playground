const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackConfigurator = require('webpack-configurator')
const webpack = require('webpack')
const config = require('../config').default
const paths = config.utils_paths
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const result = () => {
  const WpConfig = new WebpackConfigurator()

  WpConfig.merge({
    entry: paths.demo('app'),
    target: 'web',
    colors: true,
    debug: true,
    progress: true,
    output: {
      filename: 'app-[hash].js',
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

  const cssLoader = 'css-loader?localIdentName=CodePlayground--[name]__[local]&modules'
  WpConfig.loader('sass', {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      [
        cssLoader,
        'sass-loader'
      ]
    )
  })

  WpConfig.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      [cssLoader]
    ),
    exclude: /node_modules/
  })

  WpConfig.loader('css-global', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      ['css-loader']
    ),
    include: /node_modules/
  })

  // ------------------------------------
  // Plugins
  // ------------------------------------
  WpConfig.plugin('define', webpack.DefinePlugin, [config.globals])
  WpConfig.plugin('extractCSS', ExtractTextPlugin, [
    'app.[hash].css'
  ])

  if (config.env === 'development') {
    WpConfig.plugin('hmr', webpack.HotModuleReplacementPlugin)
    WpConfig.plugin('html', HtmlWebpackPlugin, [{
      template: paths.demo('develop.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }])
  }

  if (config.env === 'production') {
    WpConfig.plugin('occcurenceOrder', webpack.optimize.OccurrenceOrderPlugin)
    WpConfig.plugin('dedupe', webpack.optimize.DedupePlugin)
    WpConfig.plugin('noError', webpack.NoErrorsPlugin)
    WpConfig.plugin('uglify', webpack.optimize.UglifyJsPlugin, [{
      compress: {
        unused: true,
        dead_code: true
      },
      warning: false
    }])
    WpConfig.plugin('html', HtmlWebpackPlugin, [{
      template: paths.demo('gh-pages.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }])
  }

  return WpConfig.resolve()
}

module.exports = result()
