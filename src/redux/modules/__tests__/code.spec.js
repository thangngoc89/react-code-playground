import * as codeModule from '../code'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(redux) code module', () => {
  describe('create action to handle', () => {
    it('codeSet, onChange event from editor', () => {
      const code = 'foo'
      const type = 'bar'

      expect(codeModule.codeSet(code, type)).to.deep.equal({
        type: codeModule.CODE_SET,
        payload: {code, type}
      })
    })

    it('codeSetParsed, compiled code from preprocessors', () => {
      const code = 'foo'
      const type = 'bar'

      expect(codeModule.codeSetParsed(code, type)).to.deep.equal({
        type: codeModule.CODE_SET_PARSED,
        payload: {code, type}
      })
    })

    it('codeSync, sync code on mount and receive props', () => {
      expect(codeModule.codeSync()).to.deep.equal({
        type: codeModule.CODE_SYNC,
        payload: undefined
      })
    })

    it('codeRefresh, set code brach to initial state on change props', () => {
      expect(codeModule.codeRefresh()).to.deep.equal({
        type: codeModule.CODE_REFRESH,
        payload: undefined
      })
    })
  })

  describe('create thunk to handle', () => {
    it('codeSetWithTab, since code editor does not know current codeType ' +
    'we get it from activeTab in store', (done) => {
      const initialState = {
        activeTab: 'css'
      }

      const code = 'foo'
      const expectedActions = [
        codeModule.codeSet(code, 'css')
      ]

      const store = mockStore(initialState, expectedActions, done)
      store.dispatch(codeModule.codeSetWithTab(code))
    })

    it('codeSyncAndParse, should not called codeParse when there is no parser in props', (done) => {
      const initialState = {}
      const props = {}

      const expectedActions = [
        codeModule.codeSync(props)
      ]

      const store = mockStore(initialState, expectedActions, done)
      store.dispatch(codeModule.codeSyncAndParse(props))
    })

    describe('parse code', () => {

    })
  })
})
