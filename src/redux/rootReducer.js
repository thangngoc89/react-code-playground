import { combineReducers } from 'redux'
import activeTab from './modules/activeTab'
import compiling from './modules/compiling'
import code from './modules/code'

export default combineReducers({
  activeTab,
  code,
  compiling
})
