import * as codeModule from '../code'
import { actions as compileModule } from '../compiling'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(redux) code module', () => {
  describe('create action to handle', () => {
    it('codeSet', () => {
      const code = 'foo'
      const type = 'bar'

      expect(codeModule.codeSet(code, type)).to.deep.equal({
        type: codeModule.CODE_SET,
        payload: {code, type}
      })
    })

    it('codeSetParsed', () => {
      const code = 'foo'
      const type = 'bar'

      expect(codeModule.codeSetParsed(code, type)).to.deep.equal({
        type: codeModule.CODE_SET_PARSED,
        payload: {code, type}
      })
    })

    it('codeSync', () => {
      expect(codeModule.codeSync()).to.deep.equal({
        type: codeModule.CODE_SYNC,
        payload: undefined
      })
    })

    it('codeRefresh', () => {
      expect(codeModule.codeRefresh()).to.deep.equal({
        type: codeModule.CODE_REFRESH,
        payload: undefined
      })
    })
  })

  describe('create thunk to handle', () => {
    it('codeSetWithTab', (done) => {
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

    it('codeSyncAndParse', (done) => {
      const initialState = {}
      const props = {}

      const expectedActions = [
        codeModule.codeSync(props)
      ]

      const store = mockStore(initialState, expectedActions, done)
      store.dispatch(codeModule.codeSyncAndParse(props))
    })

    describe('codeParse', () => {
      let _spies, _props
      beforeEach(() => {
        _spies = {}
        _spies.dispatch = sinon.spy()
        _props = {
          plugins: []
        }
      })

      it('do not dispatch any actions when no parsers passed', () => {
        const thunk = codeModule.codeParse(_props)
        thunk(_spies.dispatch)
        _spies.dispatch.should.have.not.been.called
      })

      it('dispatch compileStart and compileComplete action', () => {
        const parser = {
          type: 'parser',
          codeType: 'css',
          parse: (code, cb) => {
            cb('compiled code', 'css')
          }
        }
        const initialState = {
          code: {
            css: {
              original: '.foo{border: 0}'
            }
          }
        }

        _props = {
          ..._props,
          plugins: [parser]
        }

        const thunk = codeModule.codeParse(_props)
        thunk(_spies.dispatch, () => initialState)
        _spies.dispatch.should.have.been.calledTwice
        _spies.dispatch.firstCall.calledWith(
          compileModule.compileStart('css')
        )
        _spies.dispatch.secondCall.calledWith(
          compileModule.compileComplete('compiled code', 'css')
        )
      })
    })
  })
})
