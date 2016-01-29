import React, { Component, PropTypes } from 'react'
import CodeEditor from '../CodeEditor'
import Nav from '../Nav'
import Result from '../Result'
import styles from './Playground.scss'

class Playground extends Component {
  static propTypes = {
    html: PropTypes.string,
    css: PropTypes.string,
    javascript: PropTypes.string,
  };

  static defaultProps = {
    html: '',
    css: '',
    javascript: ''
  };

  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'result',
      code: {
        css: props.css,
        html: props.html,
        javascript: props.javascript
      }
    }

    this.onTabClick = this.onTabClick.bind(this)
    this.onCodeChange = this.onCodeChange.bind(this)
  }

  onTabClick (tab) {
    this.setState({activeTab: tab})
  }

  onCodeChange (newCode) {
    const {
      activeTab,
      code
    } = this.state

    this.setState({
      code: {
        ...code,
        [activeTab]: newCode
      }
    })
  }

  get codeEditorProps () {
    const {
      activeTab,
      code
    } = this.state

    return {
      code: code[activeTab],
      options: {
        mode: (activeTab === 'html') ? 'htmlmixed' : activeTab
      },
      onChange: this.onCodeChange
    }
  }

  render () {
    return (
      <div className={styles.main}>
        <Nav
          activeTab={this.state.activeTab}
          onTabClick={this.onTabClick}
        />
        {
          this.state.activeTab === 'result' &&
          <Result code={this.state.code} />
        }
        {
          this.state.activeTab !== 'result' &&
          <CodeEditor {...this.codeEditorProps} />
        }
      </div>
    )
  }
}

export default Playground
