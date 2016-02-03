import React from 'react'
import $ from 'teaspoon'
import CodeEditor from '../CodeEditor'
import CodeMirror from 'react-codemirror'

const render = props => $(<CodeEditor {...props} />).render()
const shallowRender = props => $(<CodeEditor {...props} />).shallowRender()

describe('(component) CodeEditor', () => {
  let $element, _props, _spy

  beforeEach(() => {
    _spy = sinon.spy()
    _props = {
      code: 'foo',
      onChange: _spy,
      options: {
        foo: 'bar'
      }
    }
  })

  it('render a <CodeMirror> tag with options', () => {
    $element = shallowRender(_props)
    const $codeMirror = $element.single($.s`${CodeMirror}`)
    expect($codeMirror.props().value).to.eql('foo')
    expect($codeMirror.props().options).to.eql({
      lineNumbers: true,
      mode: 'javascript',
      foo: 'bar'
    })
  })

  it('dispatch onChange event when content changed', () => {
    $element = shallowRender(_props)
    const $codeMirror = $element.single($.s`${CodeMirror}`)
    _spy.should.have.not.been.called
    $codeMirror.trigger('change')
    _spy.should.have.been.calledOnce
  })
})
