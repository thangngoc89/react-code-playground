import reducer, * as compileModule from '../compiling'
import * as codeModule from '../code'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(redux) compiling module', () => {
  describe('create action to handle', () => {
    it('compileStart', () => {
      expect(compileModule.compileStart()).to.deep.equal({
        type: compileModule.COMPILE_START,
        payload: undefined
      })
    })

    it('compileComplete', () => {
      expect(compileModule.compileComplete()).to.deep.equal({
        type: compileModule.COMPILE_COMPLETE,
        payload: undefined
      })
    })

    it('compileCompleteWithCode', (done) => {
      const code = 'foo'
      const type = 'css'

      const initialState = {}

      const expectedActions = [
        codeModule.codeSetParsed(code, type),
        compileModule.compileComplete(type)
      ]

      const store = mockStore(initialState, expectedActions, done)
      store.dispatch(compileModule.compileCompleteWithCode(code, type))
    })
  })

  describe('have reducer to handle these actions', () => {
    it('initialState', () => {
      const expectedState = []
      expect(reducer(undefined, {}))
        .to.deep.equal(expectedState)
    })
    it('COMPILE_START', () => {
      const codeType = 'css'
      const inititalState = []
      const expectedState = [codeType]
      const action = compileModule.compileStart(codeType)
      expect(reducer(inititalState, action))
        .to.deep.equal(expectedState)
    })
    it('COMPILE_COMPLETE', () => {
      const codeType = 'css'
      const initialState = ['foo', 'css', 'bar']
      const expectedState = ['foo', 'bar']
      const action = compileModule.compileComplete(codeType)

      expect(reducer(initialState, action))
        .to.deep.equal(expectedState)
    })
  })
})
