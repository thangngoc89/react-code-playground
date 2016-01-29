import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Playground from '../src/index'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'

class App extends Component {
  render () {
    return (
      <Playground />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('mount-point'))
