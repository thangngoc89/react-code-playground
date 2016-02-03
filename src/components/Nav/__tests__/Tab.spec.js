import React from 'react'
import $ from 'teaspoon'
import Tab from '../Tab'
import styles from '../Nav.scss'

const render = props => $(<Tab {...props} />).render()
const shallowRender = props => $(<Tab {...props} />).shallowRender()

describe('(component) Nav', () => {
  describe('Tab', () => {
    let $element, _props, _spy

    beforeEach(() => {
      _spy = sinon.spy()
      _props = {
        type: 'css',
        displayName: 'CSS',
        activeTab: 'css',
        onTabClick: _spy
      }
    })

    it('render a <li> tag', () => {
      $element = shallowRender()
      expect($element.find('li').length).to.equal(1)
    })

    it('render a child <span> tag with displayName', () => {
      $element = shallowRender(_props)
      const $span = $element.single('span')
      expect($span.length).to.equal(1)
      expect($span.text()).to.equal('CSS')
    })

    it('should have .tab class', () => {
      $element.shallowRender()
      const $li = $element.single(`li.${styles.tab}`)
      expect($li.length).to.be.equal(1)
    })

    it('should have .tabActive class when activeTab === type', () => {
      $element = shallowRender(_props)
      const $li = $element.single(`li.${styles.tabActive}`)
      expect($li.length).to.equal(1)
    })

    it('should not have .tabActive class when activeTab !== type', () => {
      _props = {
        ..._props,
        activeTab: 'result'
      }

      $element = shallowRender(_props)
      const $li = $element.none(`li.${styles.tabActive}`)
      expect($li.length).to.equal(0)
    })

    it('should dispatch onTabClick action when clicked', () => {
      $element = shallowRender(_props)
      const $li = $element.single('li')
      _spy.should.have.not.been.called
      $li.trigger('click')
      _spy.should.have.been.calledOnce
    })
  })
})
