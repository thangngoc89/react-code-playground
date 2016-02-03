import { getCodeMirrorMode as mode } from '../'

describe('utils', () => {
  describe('getCodeMirrorMode', () => {
    let parser
    beforeEach(() => {
      parser = {
        codeType: 'css',
        codeMirrorMode: 'sass'
      }
    })

    it('return default mode when no parser passed', () => {
      expect(mode('css')).to.equal('css')
      expect(mode('javascript')).to.equal('javascript')
      expect(mode('html')).to.equal('htmlmixed')
    })

    it('return first parser code mode when passed an array of parsers', () => {
      const array = [parser]
      expect(mode('css', array)).to.equal(parser.codeMirrorMode)
    })

    it('return parser code mode when passed a parser object', () => {
      expect(mode('css', parser)).to.equal(parser.codeMirrorMode)
    })

    it('warn when passed multiple parsers for same code type', () => {
      const originalConsole = console.warn

      const _stub = sinon.stub(console, 'warn')
      const array = [parser, parser]
      mode('css', array)
      _stub.should.have.been.calledOnce

      console.warn = originalConsole
    })

    it('throw error when type and parser code type doesn not match', () => {
      expect(function () {
        mode('html', parser)
      }).to.throw('Parser Type css is not equal with Code Type html')
    })
  })
})
