/**
 * Concat stylesheets generate by babel
 * into one file comsume and themable
 */
import fs from 'fs-extra'
import config from '../config'
const debug = require('debug')('playground:bin:concatStyleSheet')
const paths = config.utils_paths

const outputFile = paths.lib('CodePlayground.css')

debug('Start concat stylesheet')

// Try to remove old outputFile
try {
  fs.statSync(outputFile)
  fs.removeSync(outputFile)
} catch (e) {
  // noop
}

let items = []

fs.walk(paths.lib('assets'))
  .on('readable', function () {
    let item
    while ((item = this.read())) {
      if (item.path.endsWith('.css')) {
        items.push(item.path)
      }
    }
  })
  .on('end', function () {
    const ws = fs.createOutputStream(outputFile)
    for (let i in items) {
      debug('Reading ' + items[i])
      let data = fs.readFileSync(items[i])
      ws.write(data + `\n`)
    }
    debug('Wrote concated stylesheet into ' + outputFile)

    fs.removeSync(paths.lib('assets'))
    debug('Removed lib/assets folder')
  })
