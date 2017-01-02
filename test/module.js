const { expect } = require('chai')
const wirenock = require('../')

describe('Wirenock', () => {
  it('is a function', () => {
    expect(wirenock).to.be.a('function')
  })
  describe('.default', () => {
    it('is the same function', () => {
      const actual = wirenock.default
      expect(actual).to.equal(wirenock)
    })
  })
})

