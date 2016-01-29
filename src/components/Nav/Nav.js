import React, { Component, PropTypes } from 'react'
import RenderTab from './RenderTab'
import styles from './Nav.scss'
const cx = require('classnames/bind').bind(styles)

class Nav extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
    onTabClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeTab: 'result'
  };

  render () {
    const tabs = [
      {
        name: 'result',
        displayName: 'Result'
      },
      {
        name: 'html',
        displayName: 'HTML'
      },
      {
        name: 'css',
        displayName: 'CSS'
      },
      {
        name: 'javascript',
        displayName: 'JS'
      }
    ]

    return (
      <ul className={styles.nav}>
        {tabs.map((tab) => (
          <RenderTab
            key={tab.name}
            name={tab.name}
            displayName={tab.displayName}
            activeTab={this.props.activeTab}
            onTabClick={this.props.onTabClick}
          />
        ))}
      </ul>
    )
  }
}

export default Nav
