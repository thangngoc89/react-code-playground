import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'

class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object
  };

  static defaultProps = {
    code: ''
  };

  get options () {
    const defaultOptions = {
      lineNumbers: true,
      mode: 'javascript'
    }

    return {
      ...defaultOptions,
      ...(this.props.options !== undefined) && this.props.options
    }
  }

  render () {
    return (
      <CodeMirror
        value={this.props.code}
        options={this.options}
        onChange={this.props.onChange}
      />
    )
  }
}

export default CodeEditor
