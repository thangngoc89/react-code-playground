import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Playground from '../src/index'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'
import './styles.scss'

import sassParser from '../src/plugins/parsers/sass'

const cssSlack = require('raw!./examples/slack-logo/sass.example')
const htmlSlack = require('raw!./examples/slack-logo/html.example')
const codeSlack = {
  css: cssSlack,
  html: htmlSlack,
  plugins: [
    sassParser
  ]
}

const cssEditr = require('raw!./examples/editr.js/css.example')
const htmlEditr = require('raw!./examples/editr.js/html.example')
const codeEditr = {
  css: cssEditr,
  html: htmlEditr
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: codeEditr
    }
    this.slackLogo = this.slackLogo.bind(this)
    this.editr = this.editr.bind(this)
  }

  slackLogo () {
    this.setState({
      code: codeSlack
    })
  }

  editr () {
    this.setState({
      code: codeEditr
    })
  }

  render () {
    return (
      <div>
        <div style={{height: '400px'}}>
          <Playground
            {...this.state.code}
          />
        </div>
        <div className='button-row'>
          <button onClick={this.slackLogo}>
            Slack Logo
          </button>
          <button onClick={this.editr}>
            Editr's demo
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('mount-point'))
