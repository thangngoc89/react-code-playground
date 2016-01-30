import React, { Component, PropTypes } from 'react'
import CodeEditor from '../CodeEditor'
import Nav from '../Nav'
import Result from '../Result'
import codeMirrorMode from './codeMirrorMode'
import styles from './Playground.scss'

class Playground extends Component {
  static propTypes = {
    html: PropTypes.object,
    css: PropTypes.object,
    javascript: PropTypes.object,

    cssParser: PropTypes.object,
    javascriptParser: PropTypes.object,
    htmlParser: PropTypes.object,

    compiling: PropTypes.array.isRequired,
    activeTab: PropTypes.string.isRequired,
    tabSet: PropTypes.func.isRequired,
    codeSet: PropTypes.func.isRequired,
    codeSync: PropTypes.func.isRequired,
    codeParse: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.tabSet = this.tabSet.bind(this)
  }

  componentDidMount () {
    this.props.codeSync(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isSynced) {
      this.props.codeSync(nextProps)
    }
  }

  get codeEditorProps () {
    const activeTab = this.props.activeTab
    return {
      code: this.props[activeTab]['original'],
      options: {
        // Get CodeMirrorMode from default value
        // or from Parser using convention
        mode: codeMirrorMode(
          activeTab,
          this.props[activeTab + 'Parser']
        )
      },
      onChange: this.props.codeSet
    }
  }

  /**
   * Get parsed code
   * Trigger parse if needed
   * @return {object}
   */
  get codeParsed () {
    const originalOrParsed = code => {
      return (code.hasOwnProperty('parsed'))
        ? code.parsed
        : code.original
    }

    return {
      css: originalOrParsed(this.props.css),
      javascript: originalOrParsed(this.props.javascript),
      html: originalOrParsed(this.props.html)
    }
  }

  /**
   * Switch tab, trigger parse
   * @param  {string} tab [tab name]
   */
  tabSet (tab) {
    this.props.tabSet(tab)
    if (tab === 'result') {
      this.props.codeParse(this.props)
    }
  }

  render () {
    const isCompiling = (this.props.compiling.length > 0)

    return (
      <div className={styles.main}>
        <Nav
          activeTab={this.props.activeTab}
          onTabClick={this.tabSet}
        />
        {
          isCompiling &&
          <span>Compiling...</span>
        }
        {
          this.props.activeTab === 'result' &&
          !isCompiling &&
          <Result code={this.codeParsed} />
        }
        {
          this.props.activeTab !== 'result' &&
          <CodeEditor {...this.codeEditorProps} />
        }
      </div>
    )
  }
}

export default Playground
