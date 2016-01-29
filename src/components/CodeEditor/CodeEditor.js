import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'

class Editor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object
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

export default Editor
