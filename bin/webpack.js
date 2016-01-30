import webpack from "webpack"
const debug = require('debug')('playground:bin:webpack')

export default (webpackConfig, cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err
    }

    if (stats.hasErrors()) {
      stats.compilation.errors.forEach(
        item => {
          item.stack.split("\n").forEach(line => debug(line))
        }
      )

      throw new Error("webpack build failed with errors")
    }
    cb(stats)
  })
}
