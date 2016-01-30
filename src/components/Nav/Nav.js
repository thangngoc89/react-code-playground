import React, { Component, PropTypes } from 'react'
import Tab from './Tab'
import styles from './Nav.scss'

class Nav extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
    onTabClick: PropTypes.func.isRequired,
    parsers: PropTypes.array
  };

  static defaultProps = {
    activeTab: 'result'
  };

  get tabs () {
    let tabs = {
      'result': 'Result',
      'html': 'HTML',
      'css': 'CSS',
      'javascript': 'JS'
    }

    const { parsers } = this.props
    if (parsers) {
      parsers.map(t => {
        tabs[t.codeType] = t.name
      })
    }
    return tabs
  }
  render () {
    const tabsForRender = Object.keys(this.tabs).map(type =>
      <Tab
        key={type}
        type={type}
        displayName={this.tabs[type]}
        activeTab={this.props.activeTab}
        onTabClick={this.props.onTabClick}
      />
    )

    return (
      <ul className={styles.nav}>
        {tabsForRender}
      </ul>
    )
  }
}

export default Nav
