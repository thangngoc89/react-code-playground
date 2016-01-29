import React from 'react'
import styles from './Nav.scss'
const cx = require('classnames/bind').bind(styles)

const RenderTab = ({
  name,
  displayName,
  activeTab,
  onTabClick
}) => {
  const className = cx('tab', {
    tabActive: activeTab === name
  })

  return (
    <li
      className={className}
      onClick={() => onTabClick(name)}
    >
      <span>{displayName}</span>
    </li>
  )
}

export default RenderTab
