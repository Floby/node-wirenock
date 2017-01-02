[![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

node-wirenock
==================

> A nock-like interface to configure a running Wiremock server

[Nock](https://www.npmjs.com/package/nock) is a popular tool to stub and mock HTTP calls in node.js

Installation
------------

    npm install --save-dev wirenock

Usage
-----

> Note that you need to have a [Wiremock](http://wiremock.org/) instance
> running for any of this to work

```javascript
const scope = wirenock('http://wiremock.host:8080')
  .get('/some/url')
  .reply(200, {
    some: 'data'
  })
  .configure()
  .then(() => {
    // Later...
    scope.isDone()
      .then(() => console.log('success'))
      .catch((reason) => console.error('something went wrong', reason))
  })
```

Test
----

You can run the tests with `npm test`. You will need to know [mocha][mocha-url]

Contributing
------------

Anyone is welcome to submit issues and pull requests

License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: http://img.shields.io/travis/Floby/node-wirenock/master.svg?style=flat
[travis-url]: https://travis-ci.org/Floby/node-wirenock
[coveralls-image]: http://img.shields.io/coveralls/Floby/node-wirenock/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Floby/node-wirenock
[mocha-url]: https://github.com/visionmedia/mocha



