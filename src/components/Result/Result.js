import React, { Component, PropTypes } from 'react'
import styles from './Result.scss'
import generateHTML from './generateHTML'

class Result extends Component {
  static propTypes = {
    code: PropTypes.shape({
      html: PropTypes.string,
      css: PropTypes.string,
      javascript: PropTypes.string
    })
  };

  componentDidMount () {
    this.renderIframeContent()
  }

  componentDidUpdate () {
    this.renderIframeContent()
  }

  shouldComponentUpdate (nextProps) {
    return (nextProps.code !== this.props.code)
  }

  renderIframeContent () {
    const content = generateHTML(this.props.code)
    this.iframe.contentWindow.document.open()
    this.iframe.contentWindow.document.write(content)
    this.iframe.contentWindow.document.close()
  }

  render () {
    return (
      <iframe
        className={styles.iframe}
        ref={ref => this.iframe = ref}
      />
    )
  }
}

export default Result
