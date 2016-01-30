'use strict'
require('babel-register')

const path = require('path')
const config = require('../config').default
const paths = config.utils_paths
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
    path: paths.base('lib/assets')
  },
  plugins: [
    new ExtractTextPlugin(path.parse(process.argv[2]).name + '.css')
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader?localIdentName=CodePlayground--[name]__[local]&modules',
            'sass-loader'
          ]
        )
      }
    ]
  }
}
