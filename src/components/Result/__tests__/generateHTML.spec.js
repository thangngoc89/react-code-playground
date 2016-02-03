import generateHTML from '../generateHTML.js'
import beautifyHTML from '../../../__tests__/utils/beautifyHTML'

describe('(component) Result', () => {
  describe('generateHTML', () => {
    const html = '<p>foo</p>'
    const javascript = `console.log('foo')`
    const css = `.foo {border: 0}`

    it('generate expected code', () => {
      const result = generateHTML({javascript, css, html})
      const expectedResult =
`<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${javascript}</script>
</body>
</html>
`
      expect(beautifyHTML(result)).to.equal(beautifyHTML(expectedResult))
    })
  })
})
