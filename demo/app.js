import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Playground from '../src/index'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'
import './styles.css'

const css = require('raw!./examples/css.example')
const html = require('raw!./examples/html.example')
const javascript = require('raw!./examples/javascript.example')
const code = {
  css,
  html,
  javascript
}

class App extends Component {
  render () {
    return (
      <div style={{height: '400px'}}>
        <Playground
          {...code}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('mount-point'))
