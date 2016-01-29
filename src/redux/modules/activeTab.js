import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const TAB_SET = 'playground/tab/SET'

// ------------------------------------
// Actions
// ------------------------------------
export const tabSet = createAction(TAB_SET)

export const actions = {
  tabSet
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 'result'

export default handleActions({
  [TAB_SET]: (state, { payload }) => payload
}, initialState)
