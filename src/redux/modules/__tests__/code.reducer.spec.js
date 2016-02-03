import reducer, * as codeModule from '../code'

describe('(redux) code module', () => {
  describe('have reducer to handle these actions', () => {
    it('initialState', () => {
      const expectedState = {
        isSynced: false
      }
      expect(reducer(undefined, {}))
        .to.deep.equal(expectedState)
    })
    it('CODE_SET', () => {
      const initialState = {
        css: {
          original: 'foo',
          parsed: 'bar'
        }
      }
      const expectedState = {
        css: {
          original: 'new code'
        }
      }

      const action = codeModule.codeSet('new code', 'css')
      expect(reducer(initialState, action))
        .to.deep.equal(expectedState)
    })

    it('CODE_SET_PARSED', () => {
      const initialState = {
        css: {
          original: 'new code'
        }
      }
      const expectedState = {
        css: {
          original: 'new code',
          parsed: 'parsed code'
        }
      }

      const action = codeModule.codeSetParsed('parsed code', 'css')
      expect(reducer(initialState, action))
        .to.deep.equal(expectedState)
    })

    it('CODE_SYNC', () => {
      const initialState = {
        isSynced: false
      }
      const expectedState = {
        isSynced: true,
        css: {
          original: 'foo'
        },
        html: {
          original: 'foo'
        },
        javascript: undefined
      }

      const action = codeModule.codeSync({
        css: {
          original: 'foo'
        },
        html: {
          original: 'foo'
        }
      })

      expect(reducer(initialState, action))
        .to.deep.equal(expectedState)
    })
    it('CODE_REFRESH', () => {
      const initialState = {
        foo: 'bar'
      }
      const expectedState = {
        isSynced: false
      }

      const action = codeModule.codeRefresh()

      expect(reducer(initialState, action))
        .to.deep.equal(expectedState)
    })
  })
})
