'use strict';

const mock = require('egg-mock');

describe('test/passport-local.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passport-local-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passportLocal')
      .expect(200);
  });
});
