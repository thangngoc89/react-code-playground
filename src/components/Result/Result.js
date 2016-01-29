import React, { Component, PropTypes } from 'react'
import styles from './Result.scss'
import generator from './generateIframeContent'

class Result extends Component {
  static propTypes = {
    code: PropTypes.shape({
      html: PropTypes.string.isRequired,
      css: PropTypes.string.isRequired,
      javascript: PropTypes.string.isRequired,
    })
  };

  componentDidMount () {
    this.renderIframeContent(this.props.code)
  }

  componentWillReceiveProps (nextProps) {
    this.renderIframeContent(nextProps.code)
  }

  renderIframeContent (code) {
    const content = generator(code)
    this.iframe.contentWindow.document.open()
    this.iframe.contentWindow.document.write(content)
    this.iframe.contentWindow.document.close()
  }

  render () {
    return (
      <div className={styles.div}>
        <iframe
          className={styles.iframe}
          ref={(ref) => this.iframe = ref}
        />
      </div>
    )
  }
}

export default Result
