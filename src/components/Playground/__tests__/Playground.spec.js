import React from 'react'
import $ from 'teaspoon'
import { bindActionCreators } from 'redux'
import Playground from '../Playground'
import Nav from '../../Nav'
import Result from '../../Result'
import CodeEditor from '../../CodeEditor'
import styles from '../Playground.scss'

const render = props => $(<Playground {...props} />).render()
const shallowRender = props => $(<Playground {...props} />).shallowRender()

describe('(component) Playground', () => {
  let $element, _props, _spies

  beforeEach(() => {
    _spies = {}

    _props = {
      html: {
        original: 'html'
      },
      css: {
        original: 'css'
      },
      javascript: {
        original: 'javascript'
      },
      plugins: [],
      compiling: [],
      activeTab: 'result',
      ...bindActionCreators({
        tabSet: (_spies.tabSet = sinon.spy()),
        codeSet: (_spies.codeSet = sinon.spy()),
        codeSync: (_spies.codeSync = sinon.spy()),
        codeParse: (_spies.codeParse = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    $element = shallowRender(_props)
  })

  it('render a div with .main class and <Nav>', () => {
    $element.single(`div.${styles.main}`)
    $element.single($.s`${Nav}`)
  })

  it('render <Result> when activeTab === result', () => {
    $element.single($.s`${Result}`)
    $element.none('span')
    $element.none($.s`${CodeEditor}`)
  })

  it('render <Result> with parsed code', () => {
    _props = {
      ..._props,
      css: {
        original: 'css',
        parsed: 'css_parsed'
      }
    }

    $element = shallowRender(_props)
    $element.none('span')
    const $result = $element.single($.s`${Result}`)
    const props = $result.props()
    props.should.have.property('code')
    props.code.should.have.property('css', 'css_parsed')
  })

  it('render "isCompiling" text when compiling code', () => {
    _props = {
      ..._props,
      compiling: ['css']
    }

    $element = shallowRender(_props)
    $element.single('span')
    $element.none($.s`${Result}`)
  })

  it('render <CodeEditor> when activeTab !== result', () => {
    _props = {
      ..._props,
      activeTab: 'css'
    }

    $element = shallowRender(_props)
    $element.single($.s`${CodeEditor}`)
    $element.none('span')
    $element.none($.s`${Result}`)
  })
  //
  // it('trigger codeSync on mount', () => {
  //   _spies.dispatch.should.have.not.been.called
  //   $element = render(_props)
  //   _spies.codeSync.should.have.been.calledOnce
  // })
})
