const parser = {
  type: 'parser',
  name: 'SASS',
  codeType: 'css',
  codeMirrorMode: 'sass',
  parse: function (code, cb) {
    if (
      typeof window !== 'undefined' &&
      typeof window.Sass !== 'object'
    ) {
      throw new Error(
        'Sass.js is not available in global scope ' +
        'Please download and embed it into your website' +
        'from https://github.com/medialize/sass.js'
      )
    }
    window.Sass.compile(code, result => {
      if (result.status === 0) {
        cb(result.text, 'css')
      } else {
        // TODO: Handle me
        console.error(result)
      }
    })
  }
}

export default parser
