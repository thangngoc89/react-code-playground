import parser from '../sass'

describe('sass parser', () => {
  it('should be an object', () => {
    expect(typeof parser).to.eql('object')
  })
  it('should have type parser', () => {
    expect(parser).to.have.property('type', 'parser')
  })
  it('should have enough required properties for parser', () => {
    expect(parser).to.have.property('type')
    expect(parser).to.have.property('name')
    expect(parser).to.have.property('codeType')
    expect(parser).to.have.property('codeMirrorMode')
    expect(parser).to.have.property('parse')
  })
  it('should throw error when Sass.js not available in global scope', () => {
    window.Sass = undefined
    expect(function () {
      parser.parse()
    }).to.throw(Error)
  })
  it('should compile code', () => {
    const _spy = sinon.spy()
    window.Sass = {}
    window.Sass.compile = (code, cb) => {
      cb({
        status: 0,
        text: 'result'
      })
    }

    parser.parse('code', _spy)
    _spy.should.have.been.calledOnce
    _spy.should.have.been.calledWith('result', 'css')
  })

  it('should console.error when status !== 0', () => {
    const originalConsole = console.error
    const _spy = sinon.spy()
    const _stub = sinon.stub(console, 'error')

    window.Sass = {}
    window.Sass.compile = (code, cb) => {
      cb({
        status: 1
      })
    }

    parser.parse('code', _spy)
    _spy.should.have.not.been.called
    _stub.should.have.been.calledOnce
    _stub.should.have.been.calledWith({
      status: 1
    })

    console.error = originalConsole
  })
})
