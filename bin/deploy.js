const ghpages = require('gh-pages')
const debug = require('debug')('playground:bin:deploy')
const path = require('path')

debug('Start deployment process.')

debug('Clean up temp folder')
ghpages.clean()

debug('Deploy with github token')
ghpages.publish(path.join(__dirname, '../dist'), {
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/thangngoc89/react-code-playground.git',
  silent: true
}, callback)

var callback = function (err) {
  if (err) {
    debug(err)
    return
  }
  debug('Finish')
}
