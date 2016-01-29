import express, { Router } from 'express'
import config from '../config'

import webpack from 'webpack'
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from 'connect-history-api-fallback'
import wpConfig from '../build/webpack.config'

const debug = require('debug')('app:bin:server')
const paths = config.utils_paths
const webpackCompiler = webpack(wpConfig)

const server = express()
const router = Router()

router.use(historyFallbackMiddleware({
  verbost: false
}))
router.get('*', express.static(paths.demo()))

server.use('/', router)
server.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: '/',
  stats: {
    colors: true,
    // hide all chunk dependencies because it's unreadable
    chunkModules: false,
    // noize
    // assets: false
  },
  // noInfo: true
}))

server.use(webpackHotMiddleware(webpackCompiler))

const {
  server_port,
  server_host
} = config

server.listen(server_port, server_host, () => {
  debug(`Server is now running at ${server_host}:${server_port}.`)
})
