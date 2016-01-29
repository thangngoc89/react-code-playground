import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Playground from '../src/index'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'
import './styles.css'

import sassParser from '../src/parsers/sass'

const css = require('raw!./examples/slack-logo/sass.example')
const html = require('raw!./examples/slack-logo/html.example')
const code = {
  css,
  html
}

class App extends Component {
  render () {
    return (
      <div style={{height: '400px'}}>
        <Playground
          {...code}
          cssParser={sassParser}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('mount-point'))
