import Playground from './Playground'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as activeTabActions } from '../../redux/modules/activeTab'
import { actions as codeActions } from '../../redux/modules/code'
import { actions as compilingActions } from '../../redux/modules/compiling'

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
  compiling: state.compiling,
  ...state.code
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...activeTabActions,
    ...codeActions,
    ...compilingActions
  }, dispatch)
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // If code was not synced into store
  // Use code from ownProps
  if (!stateProps.isSynced) {
    return {
      ...dispatchProps,
      ...stateProps,
      ...ownProps,
      ...{
        css: {
          original: ownProps.css
        },
        html: {
          original: ownProps.html
        },
        javascript: {
          original: ownProps.javascript
        }
      }
    }
  }

  // Or use code from store
  return {
    ...dispatchProps,
    ...ownProps,
    ...stateProps
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Playground)
