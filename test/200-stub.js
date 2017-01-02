const { default: wirenock, Stub } = require('../')
const { expect } = require('chai')

describe('new Stub(scope, method, path)', () => {
  const method = 'GET'
  const path = '/some/path'

  let scope
  beforeEach(() => {
    scope = wirenock('http://localhost:8000')
  })
  let stub
  beforeEach(() => {
    stub = new Stub(scope, method, path)
  })

  describe('.describe()', () => {
    it('returns a wiremock description', () => {
      // Given
      // When
      const actual = stub.describe()
      // Then
      expect(actual).to.have.property('request')
        .and.to.deep.equal({
          method: 'GET',
          url: '/some/path'
      })
    })
  })

  describe('.reply(code)', () => {
    const code = 201
    let subject
    beforeEach(() => { subject = stub.reply(code) })

    it('adds the status code to the wiremock description', () => {
      const actual = stub.describe()
      expect(actual).to.have.property('response')
        .and.to.deep.equal({
          status: code
        })
    })

    it('returns the parent scope', () => {
      expect(subject).to.equal(scope)
    })

  })
})
