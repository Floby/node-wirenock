const { default: wirenock, Stub } = require('../')
const { expect } = require('chai')
const sinon = require('sinon')
const Sender = require('../sender')
require('chai').use(require('chai-as-promised'))

describe('Wirenock(url)', () => {
  let scope
  beforeEach(() => {
    scope = wirenock('http://localhost:8000')
  })
  describe('.configure()', () => {
    it('returns a Promise', () => {
      // When
      const actual = scope.configure()  
      // Then
      expect(actual).to.be.an.instanceof(Promise)
    })

    it('rejects', () => {
      // When
      const actual = scope.configure()
      // Then
      return expect(actual).to.be.rejectedWith(/nothing to configure/i)
    })

    describe('when there are some configured stubs', () => {
      beforeEach(() => {
        scope.get('/url/1')
        scope.get('/url/2')
      })
      beforeEach(() => {
        senderMock = sinon.mock(Sender)
      })
      afterEach(() => senderMock.restore())
      it('calls sender.sendDescriptions(url, descriptions)', () => {
        // Given
        const expected = scope._stubs.map(stub => stub.describe())
        senderMock.expects('sendDescriptions')
          .withArgs('http://localhost:8000', expected)
          .returns(Promise.resolve())
        // When
        return scope.configure()
          .then(() => {
            senderMock.verify()
          })
      })
    })
  })
  describe('._descriptions()', () => {
    it('returns an empty list', () => {
      // When
      const actual = scope._descriptions()
      // Then
      expect(actual).to.deep.equal([])
    })
  })
  describe('.get(path)', () => {
    it('returns the created stub', () => {
      // When
      const actual = scope.get('/some/url')
      // Then
      expect(actual).to.be.an.instanceof(Stub)
    })
    describe('then ._descriptions()', () => {

      it('returns a list of one description for that path', () => {
        scope.get('/some/url')
        // When
        const actual = scope._descriptions() 
        // Then
        expect(actual).to.deep.equal([
          {
            request: {
              method: 'GET',
              url: '/some/url'
            },
            response: { status: 200 }
          }
        ])
      })

      describe('.reply(code)', () => {
        describe('._descriptions()', () => {
          it('returns a list of one description for that path and response code', () => {
            // When
            const actual = scope.get('/some/url')
              .reply(204)
              ._descriptions()
            // Then
            expect(actual).to.deep.equal([
              {
                request: {
                  method: 'GET',
                  url: '/some/url'
                },
                response: {
                  status: 204,
                }
              }
            ])
          })
        })
      })
    })
  })
})
