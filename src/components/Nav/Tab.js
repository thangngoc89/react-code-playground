import React from 'react'
import styles from './Nav.scss'
const cx = require('classnames/bind').bind(styles)

const Tab = ({
  type,
  displayName,
  activeTab,
  onTabClick
}) => {
  const className = cx('tab', {
    tabActive: activeTab === type
  })

  return (
    <li
      className={className}
      onClick={() => onTabClick(type)}
    >
      <span>{displayName}</span>
    </li>
  )
}

export default Tab
