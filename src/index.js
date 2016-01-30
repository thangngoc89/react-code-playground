import React, { Component } from 'react'
import Playground from './components/Playground'
import store from './redux/store'
import { codeRefresh } from './redux/modules/code'

class CodePlayground extends Component {
  /**
   * Set isSynced to false when receive new props
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      store.dispatch(codeRefresh())
    }
  }

  render () {
    return (
      <Playground
        store={store}
        {...this.props}
      />
    )
  }
}

export default CodePlayground
