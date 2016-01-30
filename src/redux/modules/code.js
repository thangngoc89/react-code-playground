import { createAction, handleActions } from 'redux-actions'
import { actions as compilingActions } from './compiling'
import { bindActionCreators } from 'redux'
// ------------------------------------
// Constants
// ------------------------------------
export const CODE_SET = 'playground/code/SET'
export const CODE_SET_PARSED = 'playground/code/SET_PARSED'
export const CODE_SYNC = 'playground/code/SYNC'
export const CODE_REFRESH = 'playground/code/REFRESH'

// ------------------------------------
// Actions
// ------------------------------------
export const codeSet = createAction(CODE_SET, (code, type) => ({code, type}))
export const codeSetParsed = createAction(CODE_SET_PARSED, (code, type) => ({code, type}))
export const codeSync = createAction(CODE_SYNC)
export const codeRefresh = createAction(CODE_REFRESH)

/**
 * Get current code type via activeTab
 * and save it via store
 * @param  {string} code [code from editor]
 * @return {function}    [redux-thunk]
 */
export const codeSetWithTab = (code) => {
  return (dispatch, getState) => {
    const activeTab = getState().activeTab
    dispatch(codeSet(code, activeTab))
  }
}

/**
 * Sync code from component own props
 * on mount and receiveProps
 * @param  {object} props [Playground component props]
 * @return {function}     [redux-thunk]
 */
export const codeSyncAndParse = (props) => {
  return (dispatch, getState) => {
    dispatch(codeSync(props))
    dispatch(codeParse(props))
  }
}

/**
 * Parse code and save it into store
 * @param  {object} props [Playground component props]
 * @return {function}       [redux-thunk]
 */
export const codeParse = (props) => {
  // TODO: Refactor me
  // Duplicate with Playground.parsers(codeType)
  const getParser = (codeType) => {
    if (props.plugins === undefined) {
      return undefined
    }
    let parser = props.plugins
      .filter(t =>
        (t.type === 'parser') &&
        (t.codeType === codeType)
      )
    if (parser) {
      parser = parser[0]
    }

    return parser
  }
  return (dispatch, getState) => {
    const doParse = (codeType) => {
      const parser = getParser(codeType)
      if (parser !== undefined) {
        dispatch(compilingActions.compileStart(parser.codeType))
        parser.parse(
          getState().code[codeType].original,
          bindActionCreators(compilingActions.compileComplete, dispatch)
        )
      }
    }
    doParse('css')
    doParse('javscript')
    doParse('html')
  }
}

export const actions = {
  codeSet: codeSetWithTab,
  codeSetParsed,
  codeSync: codeSyncAndParse,
  codeParse,
  codeRefresh
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isSynced: false
}

export default handleActions({
  [CODE_SET]: (state, { payload }) => ({
    ...state,
    [payload.type]: {
      original: payload.code
    }
  }),
  [CODE_SET_PARSED]: (state, { payload }) => ({
    ...state,
    [payload.type]: {
      ...state[payload.type],
      parsed: payload.code
    }
  }),
  [CODE_SYNC]: (state, { payload }) => ({
    isSynced: true,
    css: payload.css,
    html: payload.html,
    javascript: payload.javascript
  }),
  [CODE_REFRESH]: (state) => initialState
}, initialState)
