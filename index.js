const extend = require('extend')
const Sender = require('./sender')

module.exports = Wirenock
Wirenock.default = Wirenock

function Wirenock (url) {
  return new Scope(url)
}

class Scope {
  constructor (url) {
    this._url = url
    this._stubs = []
  }
  configure () {
    if (!this._stubs.length) {
      return Promise.reject(Error('nothing to configure'))
    } else {
      return Sender.sendDescriptions(this._url, this._descriptions())
    }
  }
  get (url) {
    const stub = new Stub(this, 'GET', url)
    this._stubs.push(stub)
    return stub
  }
  _descriptions() {
    return this._stubs.map((stub) => stub.describe())
  }
}

class Stub {
  constructor(scope, method, url) {
    this._scope = scope
    this._method = method
    this._url = url
    this._code = 200
  }
  reply (code) {
    this._code = code
    return this._scope
  }
  describe () {
    const request = {
      method: this._method,
      url: this._url
    }
    const response = {
      status: this._code
    }
    return { request, response }
  }

}


Wirenock.Scope = Scope
Wirenock.Stub = Stub

function clone (obj) {
  return extend(true, {}, description)
}

