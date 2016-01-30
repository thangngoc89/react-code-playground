import { createAction, handleActions } from 'redux-actions'
import { codeSetParsed } from './code'
// ------------------------------------
// Constants
// ------------------------------------
export const COMPILE_START = 'playground/compile/START'
export const COMPILE_COMPLETE = 'playground/compile/COMPELETE'

// ------------------------------------
// Actions
// ------------------------------------
export const compileStart = createAction(COMPILE_START)
export const compileComplete = createAction(COMPILE_COMPLETE)

export const compileCompleteWithCode = (code, type) => {
  return (dispatch, getState) => {
    dispatch(codeSetParsed(code, type))
    dispatch(compileComplete(type))
  }
}
export const actions = {
  compileStart,
  compileComplete: compileCompleteWithCode
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default handleActions({
  [COMPILE_START]: (state, { payload }) => ([
    ...state,
    payload
  ]),
  [COMPILE_COMPLETE]: (state, { payload }) => state.filter(t => t !== payload)
}, initialState)
