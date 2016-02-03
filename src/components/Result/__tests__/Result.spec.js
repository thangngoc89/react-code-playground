import React from 'react'
import $ from 'teaspoon'
import Result from '../Result'
import styles from '../Result.scss'

const render = props => $(<Result {...props} />).render()
const shallowRender = props => $(<Result {...props} />).shallowRender()

describe('(component) Nav', () => {
  describe('Result', () => {
    let $element, _props

    beforeEach(() => {
      _props = {
        code: {
          html: '<span>Foo</span>',
          css: '.foo {border: 0}',
          javascript: 'var a = 1'
        }
      }
    })

    it('render an <iframe> with .iframe class', () => {
      $element = shallowRender()
      $element.single(`iframe.${styles.iframe}`)
    })

    it('render an <iframe> with expected markup')
  })
})
