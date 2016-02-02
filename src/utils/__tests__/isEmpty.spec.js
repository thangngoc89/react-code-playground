import { isEmpty } from '../'

describe('utils', () => {
  describe('isEmpty function lists these at true', () => {
    it('empty object', () => {
      expect(isEmpty({})).to.be.true
    })
    it('empty array', () => {
      expect(isEmpty([])).to.be.true
    })
    it('empty string', () => {
      expect(isEmpty('')).to.be.true
    })
    it('undefined', () => {
      expect(isEmpty(undefined)).to.be.true
    })
    it('null', () => {
      expect(isEmpty(null)).to.be.true
    })
  })
})
