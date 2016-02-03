import React from 'react'
import $ from 'teaspoon'
import Nav from '../Nav'
import Tab from '../Tab'
import styles from '../Nav.scss'

const render = props => $(<Nav {...props} />).render()
const shallowRender = props => $(<Nav {...props} />).shallowRender()

describe('(component) Nav', () => {
  describe('Nav', () => {
    let $element, _props, _spy

    beforeEach(() => {
      _spy = sinon.spy()
      _props = {
        activeTab: 'result',
        onTabClick: _spy
      }
    })

    it('render an <ul> tag', () => {
      $element = shallowRender(_props)
      $element.single('ul')
    })

    it('should have .nav class', () => {
      $element = shallowRender(_props)
      $element.single(`.${styles.nav}`)
    })

    it('render 4 child <Tab /> tag', () => {
      $element = shallowRender(_props)
      const $Tab = $element.find($.s`${Tab}`)
      expect($Tab.length).to.equal(4)
    })

    it('should render default tabs name when no parser', () => {
      $element = render(_props)
      const _text = $element.text()
      expect(_text).to.eql('ResultHTMLCSSJS')
    })

    it('should render parser\'s name', () => {
      _props = {
        ..._props,
        parsers: [
          {
            name: 'Foo',
            codeType: 'html'
          }
        ]
      }
      $element = render(_props)
      const _text = $element.text()
      expect(_text).to.eql('ResultFooCSSJS')
    })
  })
})
