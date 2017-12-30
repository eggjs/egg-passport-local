'use strict';

const mock = require('egg-mock');

describe('test/passsport-local.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passsport-local-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passsportLocal')
      .expect(200);
  });
});
