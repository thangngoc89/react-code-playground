import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Playground from '../src/index'

class App extends Component {
  render () {
    return (
      <Playground />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('mount-point'))
